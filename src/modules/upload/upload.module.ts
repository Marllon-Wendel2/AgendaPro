import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UploadService],
})
export class UploadModule {}
