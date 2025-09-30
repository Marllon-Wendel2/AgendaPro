import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/entities/appointment.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly appointmentsService: AppointmentService,
  ) {}

  @Cron('0 23 * * *')
  async handleNotificaitonAppointments() {
    try {
      const listId = await this.userService.findActiveUser();
      await this.notificationAppointments(listId);
    } catch (error) {
      this.logger.log(' Erro ao processar notifição', error);
    }
  }

  async notificationAppointments(listIds: string[]) {
    await Promise.all(
      listIds.map(async (idUser) => {
        const appointments =
          await this.appointmentsService.findAppointmentInNextDay(idUser);

        const html = this.buildHtmlAppointments(appointments);

        await this.mailService.sendNow({
          to: process.env.GOOGLE_EMAIL as string,
          subject: 'Email de teste',
          html,
        });
      }),
    );
  }

  buildHtmlAppointments(appointments: Appointment[]): string {
    if (!appointments || appointments.length === 0) {
      return `<p>Boa noite, esperamos que esteja bem</p></br></br>
      <p>Nenhum agendamento encontrado</p>
      `;
    }

    const appointmentsHtml = appointments
      .map((appointment) => {
        const appointmentDate = new Date(appointment.hour);
        const formattedDate = appointmentDate.toLocaleDateString('pt-BR');
        const formattedTime = appointmentDate.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        return `
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0; border: 1px solid #ddd;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Cliente</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${appointment.client.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Telefone</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${appointment.client.phone}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Serviço</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${appointment.service.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Descrição</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${appointment.service.description}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Data</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Horário</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${formattedTime}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Duração</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${appointment.service.duration} minutos</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Preço</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">R$ ${appointment.service.price.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">Plano</td>
          <td style="padding: 12px;">${appointment.client.plan}</td>
        </tr>
      </table>
      <hr style="margin: 20px 0;">
    `;
      })
      .join('');

    return appointmentsHtml;
  }
}
