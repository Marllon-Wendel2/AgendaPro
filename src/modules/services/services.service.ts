import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createService(createServiceDto: CreateServiceDto) {
    try {
      const newService = new Service();

      const owner = await this.userRepository.findOne({
        where: { id: createServiceDto.ownerId },
      });

      if (!owner) throw new BadGatewayException('Usário não encontrado');

      newService.name = createServiceDto.name;
      newService.description = createServiceDto.description;
      newService.duration = createServiceDto.duration;
      newService.price = createServiceDto.price;
      newService.owner = owner;

      return await this.serviceRepository.save(newService);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  async findServicesByUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadGatewayException('Usuário não encontrado');
    }

    try {
      return await this.serviceRepository.find({
        where: {
          owner: { id: userId },
        },
        select: {
          owner: {
            id: true,
            nome: true,
          },
        },
        relations: ['owner'],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  async findById(id: string) {
    const service = await this.userRepository.findOne({ where: { id } });

    if (!service) {
      throw new BadGatewayException('Serviço não encontrado');
    }

    return service;
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.userRepository.findOne({ where: { id } });

      if (!service) {
        throw new BadGatewayException('Serviço não encontrado');
      }

      Object.assign(service, updateServiceDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  async deleteService(id: string) {
    try {
      return await this.serviceRepository.delete({ id });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }
}
