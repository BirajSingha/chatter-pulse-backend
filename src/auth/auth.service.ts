import {
  SignupDto,
  UpdateProfileDto,
  VerifyAccountDto,
  ChangePasswordDto,
  ForgotPasswordDto,
} from './dto/auth.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

type AuthInput = { email: string; password: string };

type SignInData = {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  createdAt: Date;
};

type AuthResult = {
  message: string;
  statusCode: number;
  accessToken: string;
  data: {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    isVerified: boolean;
    createdAt: Date;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(input.email);

    const isMatch = await bcrypt.compare(input.password, user.password);

    if (user && isMatch) {
      return {
        _id: user._id.toString(),
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      };
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    if (user.isVerified === false) {
      const verificationCode = Math.floor(
        1000 + Math.random() * 9000,
      ).toString();

      await this.mailService.sendVerificationCode(user.email, verificationCode);

      await this.usersService.saveVerificationCode(
        user.email,
        verificationCode,
      );

      throw new UnauthorizedException({
        statusCode: 401,
        message:
          'Account not verified! Please check your email for the verification code.',
        accessToken: accessToken,
        data: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        },
      });
    }

    return {
      statusCode: 200,
      message: 'Logged in successfully!',
      accessToken: accessToken,
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    };
  }

  async signUp(SignupDto: SignupDto) {
    const existingUser = await this.usersService.findUserByEmail(
      SignupDto.email,
    );

    if (existingUser) {
      throw new UnauthorizedException('Email already in use!');
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(SignupDto.password)) {
      throw new BadRequestException(
        'Password does not meet complexity requirements!',
      );
    }

    const hashedPassword = await bcrypt.hash(SignupDto.password, 10);

    SignupDto.password = hashedPassword;

    const newUser = await this.usersService.createUser(SignupDto);

    if (!newUser) {
      throw new BadRequestException('Failed to create user!');
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    await this.mailService.sendVerificationCode(
      newUser.email,
      verificationCode,
    );

    await this.usersService.saveVerificationCode(
      newUser.email,
      verificationCode,
    );

    const tokenPayload = {
      userId: newUser._id,
      email: newUser.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken: accessToken,
      message: 'Account created successfully!',
      statusCode: 201,
      data: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (updateProfileDto.username) {
      user.username = updateProfileDto.username;
    }
    if (updateProfileDto.phone) {
      user.phone = updateProfileDto.phone;
    }
    if (updateProfileDto.address) {
      user.address = updateProfileDto.address;
    }
    await this.usersService.saveUser(user);
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async reqVerifyAccount(userId: number) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user && user.isVerified) {
      throw new BadRequestException('Account already verified!');
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    await this.mailService.sendVerificationCode(user.email, verificationCode);

    await this.usersService.saveVerificationCode(user.email, verificationCode);

    return {
      message: 'Verification code sent successfully! Please check your email.',
      statusCode: 200,
    };
  }

  async verifyAccount(userId: number, VerifyAccountDto: VerifyAccountDto) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verifyCode = await this.usersService.verifyCode(
      user.email,
      VerifyAccountDto.verificationCode,
    );
    if (!verifyCode) {
      throw new BadRequestException('Invalid verification code');
    }

    return { message: 'Account verified successfully!', statusCode: 200 };
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid old password!');
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(changePasswordDto.newPassword)) {
      throw new BadRequestException(
        'New password does not meet complexity requirements!',
      );
    }

    const isPasswordSame = await bcrypt.compare(
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );

    if (isPasswordSame) {
      throw new BadRequestException(
        'New password cannot be same as old password',
      );
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    user.password = hashedPassword;

    await this.usersService.saveUser(user);

    return {
      message:
        'Password changed successfully! Please log in with your new password.',
      statusCode: 200,
    };
  }

  async generateRandomPassword(length: number) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%&*_+?';

    const allCharacters =
      uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

    let password = '';

    password +=
      uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
    password +=
      lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password +=
      specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    for (let i = 4; i < length; i++) {
      password +=
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

    return password;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findUserByEmail(
      forgotPasswordDto.email,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPassword = await this.generateRandomPassword(12);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.mailService.sendNewPassword(user.email, newPassword);

    user.password = hashedPassword;

    await this.usersService.saveUser(user);

    return {
      message: 'A new password has been sent! Please check your email.',
      statusCode: 200,
    };
  }
}
