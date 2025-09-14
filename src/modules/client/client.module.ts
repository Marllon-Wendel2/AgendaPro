import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([Client, User]), UserModule],
  exports: [ClientService],
})
export class ClientModule {}
