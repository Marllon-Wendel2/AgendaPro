import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  ParseUUIDPipe,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

@Controller('upload')
@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('logo/:userId')
  @UseInterceptors(FileInterceptor('file'))
  uploadLogo(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadLogo(userId, file);
  }
}
