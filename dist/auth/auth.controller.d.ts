import { AuthService } from './auth.service';
import { ChangePasswordDto, ForgotPasswordDto, SigninDto, SignupDto, UpdateProfileDto, VerifyAccountDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(SigninDto: SigninDto): Promise<{
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
    }>;
    signUp(SignupDto: SignupDto): Promise<{
        accessToken: string;
        message: string;
        statusCode: number;
        data: {
            _id: string;
            fullname: string;
            email: string;
            phone: string;
            address: string;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(request: any): Promise<{
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        isVerified: boolean;
        createdAt: Date;
    }>;
    reqVerifyAccount(request: any): Promise<{
        message: string;
        statusCode: number;
    }>;
    verifyAccount(request: any, VerifyAccountDto: VerifyAccountDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    updateProfile(request: any, UpdateProfileDto: UpdateProfileDto): Promise<{
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(request: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        statusCode: number;
    }>;
}
