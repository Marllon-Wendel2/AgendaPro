import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { ClientModule } from '../client/client.module';
import { Service } from '../services/entities/service.entity';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [
    TypeOrmModule.forFeature([Appointment, Service, User, Client]),
    ClientModule,
  ],
  exports: [AppointmentService],
})
export class AppointmentModule {}
