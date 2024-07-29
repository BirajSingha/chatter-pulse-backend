import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGaurd } from './gaurds/auth.gaurd';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  SigninDto,
  SignupDto,
  UpdateProfileDto,
  VerifyAccountDto,
} from './dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signIn')
  signIn(@Body() signinDto: SigninDto) {
    return this.authService.authenticate(signinDto);
  }

  @HttpCode(201)
  @Post('signUp')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('profile')
  getProfile(@Request() request) {
    return this.authService.getProfile(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('reqVerifyAccount')
  reqVerifyAccount(@Request() request) {
    return this.authService.reqVerifyAccount(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Post('verifyAccount')
  verifyAccount(
    @Request() request,
    @Body() VerifyAccountDto: VerifyAccountDto,
  ) {
    return this.authService.verifyAccount(request.user._id, VerifyAccountDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: diskStorage({
        destination: './uploads/profile_images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new Error('Only image files with .jpg/.jpeg/.png are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @Put('updateProfile')
  updateProfile(
    @Request() request,
    @Body() UpdateProfileDto: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const profileImagePath = file ? file.path : null;
    return this.authService.updateProfile(
      request.user._id,
      UpdateProfileDto,
      profileImagePath,
    );
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Put('change-password')
  changePassword(
    @Request() request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(request.user._id, changePasswordDto);
  }

  @HttpCode(200)
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
