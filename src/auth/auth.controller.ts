import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGaurd } from './gaurds/auth.gaurd';
import {
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
  @Header('Access-Control-Allow-Origin', 'http://localhost:3001')
  @Header('Access-Control-Allow-Credentials', 'true')
  signIn(@Body() SigninDto: SigninDto) {
    return this.authService.authenticate(SigninDto);
  }

  @HttpCode(201)
  @Post('signUp')
  signUp(@Body() SignupDto: SignupDto) {
    return this.authService.signUp(SignupDto);
  }

  @UseGuards(AuthGaurd)
  @Get('profile')
  getProfile(@Request() request) {
    return this.authService.getProfile(request.user._id);
  }

  @UseGuards(AuthGaurd)
  @Get('reqVerifyAccount')
  reqVerifyAccount(@Request() request) {
    return this.authService.reqVerifyAccount(request.user._id);
  }

  @UseGuards(AuthGaurd)
  @Post('verifyAccount')
  verifyAccount(@Body() VerifyAccountDto: VerifyAccountDto) {
    return this.authService.verifyAccount(VerifyAccountDto);
  }

  @UseGuards(AuthGaurd)
  @Put('updateProfile')
  updateProfile(
    @Request() request,
    @Body() UpdateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(request.user._id, UpdateProfileDto);
  }
}
