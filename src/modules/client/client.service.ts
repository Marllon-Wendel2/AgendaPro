import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    try {
      const client = new Client();

      client.name = createClientDto.name;
      client.phone = createClientDto.phone;
      client.plan = createClientDto.plan;

      const user = await this.userRepository.findOne({
        where: { id: createClientDto.userId },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      client.user = user;

      const newClient = this.clientRepository.create(client);

      return this.clientRepository.save(newClient);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro interno do sistema');
    }
  }

  async findClientById(id: number) {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });

      if (!client) {
        throw new BadRequestException('Client not found');
      }

      return client;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  async findUsersClient(id: string) {
    try {
      const result = await this.clientRepository.find({
        where: {
          user: {
            id,
          },
        },
      });

      if (result.length === 0) {
        throw new NotFoundException(
          'Não foi encontrado nenhum cliente relacionado ao usuário',
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error interno do servidor, verifique o console',
      );
    }
  }

  async updateClient(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.findClientById(+id);

      Object.assign(client, updateClientDto);

      return await this.clientRepository.save(client);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro interno do servido.');
    }
  }

  async deleteClient(id: string) {
    try {
      const result = await this.clientRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }

      return { message: `Cliente com ID ${id} foi removido com sucesso` };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }
}
