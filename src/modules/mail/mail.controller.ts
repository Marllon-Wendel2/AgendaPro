import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendEMail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.sendNow(createMailDto);
  }
}
