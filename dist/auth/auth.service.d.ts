import { SignupDto, UpdateProfileDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
type AuthInput = {
    email: string;
    password: string;
};
type SignInData = {
    _id: string;
    username: string;
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
        username: string;
        email: string;
        phone: string;
        address: string;
        isVerified: boolean;
        createdAt: Date;
    };
};
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    authenticate(input: AuthInput): Promise<AuthResult>;
    validateUser(input: AuthInput): Promise<SignInData | null>;
    signIn(user: SignInData): Promise<AuthResult>;
    signUp(SignupDto: SignupDto): Promise<{
        accessToken: string;
        message: string;
        statusCode: number;
    }>;
    getProfile(userId: number): Promise<{
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        isVerified: boolean;
        createdAt: Date;
    }>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reqVerifyAccount(userId: number): Promise<{
        message: string;
        statusCode: number;
    }>;
    verifyAccount(input: {
        email: string;
        verificationCode: string;
    }): Promise<{
        message: string;
        statusCode: number;
    }>;
}
export {};
