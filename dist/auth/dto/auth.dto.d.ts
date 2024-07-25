export declare class SignupDto {
    readonly fullname: string;
    password: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
}
export declare class SigninDto {
    readonly email: string;
    readonly password: string;
}
export declare class UpdateProfileDto {
    readonly username?: string;
    readonly phone?: string;
    readonly address?: string;
}
export declare class VerifyAccountDto {
    readonly verificationCode: string;
}
export declare class ChangePasswordDto {
    readonly oldPassword: string;
    readonly newPassword: string;
}
export declare class ForgotPasswordDto {
    readonly email: string;
}
export declare class ResetPasswordDto {
    readonly password: string;
    readonly confirmPassword: string;
}
