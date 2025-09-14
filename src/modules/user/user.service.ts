import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.findUserByEmail(createUserDto.email);

      if (existUser)
        throw new InternalServerErrorException('Email já registrado');
      const newUser = new User();

      newUser.nome = createUserDto.nome;
      newUser.email = createUserDto.email;
      newUser.senha = bcryptHashSync(createUserDto.senha, 10);

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  async findUserByEmail(email: string) {
    const userFound = await this.userRepository.findOne({ where: { email } });

    if (!userFound) {
      return false;
    }

    return {
      id: userFound.id,
      nome: userFound.nome,
      email: userFound.email,
    };
  }

  async findUser(id: string) {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });

      if (!userFound) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return {
        id: userFound.id,
        nome: userFound.nome,
        email: userFound.email,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno ao buscar o usuário',
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existUser = await this.findUser(id);

      if (!existUser) throw new BadRequestException('Usúario não encontrado');

      Object.assign(existUser, updateUserDto);

      return await this.userRepository.save(existUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno ao buscar o usuário',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
