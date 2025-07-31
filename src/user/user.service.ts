import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async registerUser(createUserDto: CreateUserDto) {
    try {
      const user = new User();

      user.id =

      return
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do sistema, verificar o console',
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
