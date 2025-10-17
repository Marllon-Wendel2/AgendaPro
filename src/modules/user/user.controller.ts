import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserPipe, UpdateUserDto } from './dto/user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UserType } from '../../types/UserType.enum';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body(CreateUserPipe) createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
