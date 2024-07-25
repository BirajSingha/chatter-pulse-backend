import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Put,
  Request,
  UseGuards,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signIn')
  signIn(@Body() SigninDto: SigninDto) {
    return this.authService.authenticate(SigninDto);
  }

  @HttpCode(201)
  @Post('signUp')
  signUp(@Body() SignupDto: SignupDto) {
    return this.authService.signUp(SignupDto);
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
  @Put('updateProfile')
  updateProfile(
    @Request() request,
    @Body() UpdateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(request.user._id, UpdateProfileDto);
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
