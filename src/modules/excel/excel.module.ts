import { Excel } from './entities/excel.entity';
import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Excel])],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
