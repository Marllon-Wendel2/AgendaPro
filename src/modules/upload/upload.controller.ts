import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  ParseUUIDPipe,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
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
