import { Process, Processor } from '@nestjs/bull';
import { MailService } from './mail.service';
import { Job } from 'bull';
import { CreateMailDto } from './dto/mail.dto';

@Processor('mail')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('sendMail')
  async handleSendMail(job: Job<CreateMailDto>) {
    console.log('Enviando e-mail para:', job.data.to);
    return await this.mailService.sendNow(job.data);
  }
}
