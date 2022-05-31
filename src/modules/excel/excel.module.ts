import { Excel } from './entities/excel.entity';
import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import config from '../../config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Excel]),
    MulterModule.register({
      dest: config.upload.root,
      storage: config.upload.storage,
    }),
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
