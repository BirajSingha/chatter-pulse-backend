import { SignupDto } from './../auth/dto/auth.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async createUser(SignupDto: SignupDto): Promise<User> {
    const createdUser = new this.userModel({
      ...SignupDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createdUser.save();
  }

  async saveUser(user: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(user._id, user, { new: true })
      .exec();
  }

  async saveVerificationCode(
    email: string,
    verificationCode: string,
  ): Promise<void> {
    await this.userModel
      .updateOne({ email }, [
        {
          $set: {
            verificationCode: verificationCode,
            verificationCodeTimeStamp: new Date(),
          },
        },
      ])
      .exec();
  }

  async verifyCode(email: string, verificationCode: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const now = new Date();
      const timestamp = new Date(user.verificationCodeTimeStamp);
      const diff = now.getTime() - timestamp.getTime();

      if (diff <= 60000 && user.verificationCode === verificationCode) {
        await this.userModel.updateOne({ email }, [
          {
            $set: {
              isVerified: true,
              verificationCode: '',
              verificationCodeTimeStamp: '',
            },
          },
        ]);

        return user;
      } else if (diff > 60000) {
        await this.userModel.updateOne({ email }, [
          {
            $set: {
              verificationCode: '',
              verificationCodeTimeStamp: '',
            },
          },
        ]);

        throw new BadRequestException('Verification code has expired!');
      }
    }
    return undefined;
  }
}
