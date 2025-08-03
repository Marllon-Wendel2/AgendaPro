import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, TypeOrmModule.forFeature([User]), JwtModule],
})
export class AuthModule {}
