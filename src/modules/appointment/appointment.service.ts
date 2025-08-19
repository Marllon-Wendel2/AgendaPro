import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import dayjs from 'dayjs';
import { Client } from '../client/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(User)
    private readonly userRevository: Repository<User>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      const user = await this.userRevository.findOne({
        where: { id: createAppointmentDto.user },
      });

      const service = await this.serviceRepository.findOne({
        where: { id: createAppointmentDto.service },
      });

      const client = await this.clientRepository.findOne({
        where: {
          id: createAppointmentDto.client,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      if (!client) {
        throw new NotFoundException('Client not found');
      }

      const newAppointment = new Appointment();
      newAppointment.user = user;
      newAppointment.service = service;
      newAppointment.client = client;
      newAppointment.hour = dayjs(createAppointmentDto.hour).toDate();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  // update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
  //   return `This action updates a #${id} appointment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
