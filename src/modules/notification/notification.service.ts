import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationService {
  constructor(private readonly mailService: MailService) {}

  async notificationAppointments() {}

  async buildHtmlAppointments() {}
}
