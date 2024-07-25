export declare class MailService {
    private transporter;
    constructor();
    sendVerificationCode(email: string, code: string): Promise<void>;
    sendNewPassword(email: string, password: string): Promise<void>;
}
