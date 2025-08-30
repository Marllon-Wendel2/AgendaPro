import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthPipe } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authUser(@Body(AuthPipe) authDto: AuthDto) {
    return this.authService.authUser(authDto);
  }
}
