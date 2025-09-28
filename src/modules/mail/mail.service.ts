import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './dto/mail.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(createMailDto: CreateMailDto) {
    try {
      await this.mailQueue.add('sendMail', createMailDto);
      return { message: 'E-mail enfileirado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Falha ao enfileirar e-mail');
    }
  }

  async sendNow(createMailDto: CreateMailDto) {
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
