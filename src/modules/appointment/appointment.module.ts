import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { ClientModule } from '../client/client.module';

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
