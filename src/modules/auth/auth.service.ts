import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authUser(authDto: AuthDto): Promise<{
    token: string;
    user: { nome: string; email: string; type: string };
  }> {
    const { email, senha } = authDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    try {
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Senha inválida');
      }

      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
        type: user.type,
      });

      const userWithoutPassword = {
        nome: user.nome,
        email: user.email,
        type: user.type,
        id: user.id,
      };

      return { token, user: userWithoutPassword };
    } catch (err) {
      if (err instanceof Error) {
        throw new UnauthorizedException(err.message);
      }
      throw new UnauthorizedException('Erro inesperado');
    }
  }
}
