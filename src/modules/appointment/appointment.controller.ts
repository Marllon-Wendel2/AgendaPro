import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get(':clientId')
  findAllAppointmentByClient(
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.appointmentService.findAllAppointmentByClient(clientId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.appointmentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAppointmentDto: UpdateAppointmentDto,
  // ) {
  //   return this.appointmentService.update(+id, updateAppointmentDto);
  // }

  @Delete(':id')
  deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }
}
