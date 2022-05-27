import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import config from '../../config';
@Module({
  imports: [
    MulterModule.register({
      dest: config.upload.root,
      storage: config.upload.storage,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
