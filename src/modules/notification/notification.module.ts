import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [MailModule, UserModule, AppointmentModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
