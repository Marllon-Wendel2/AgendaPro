import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  CreateServiceDto,
  CreateServicePipe,
  UpdateServiceDto,
} from './dto/service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  createService(@Body(CreateServicePipe) createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto);
  }

  @Get('user/:userId')
  findServicesByUser(@Param('userId') userId: string) {
    return this.servicesService.findServicesByUser(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }

  @Patch(':id')
  updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @Delete(':id')
  deleteService(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
