import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { CreateMailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async sendEMail(createMailDto: CreateMailDto) {
    try {
      await this.transporter.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: createMailDto.to,
        subject: createMailDto.subject,
        html: createMailDto.html,
      });
      return { message: 'E-mail enviado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro interno do servidor, verifique o console',
      );
    }
  }
}
