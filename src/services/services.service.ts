import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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

      newService.name = createServiceDto.name;
      newService.description = createServiceDto.description;
      newService.duration = createServiceDto.duration;
      newService.price = createServiceDto.price;

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
        relations: ['owner'],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
