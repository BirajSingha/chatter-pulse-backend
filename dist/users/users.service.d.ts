import { SignupDto } from './../auth/dto/auth.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    createUser(SignupDto: SignupDto): Promise<User>;
    saveUser(user: User): Promise<User>;
    saveVerificationCode(email: string, verificationCode: string): Promise<void>;
    verifyCode(email: string, verificationCode: string): Promise<User>;
}
