import { Excel } from './entities/excel.entity';
import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Excel)
    private excelRepository: Repository<Excel>,
  ) {}
  create(createExcelDto: CreateExcelDto) {
    return 'This action adds a new excel';
  }

  findAll(): Promise<Excel[]> {
    return this.excelRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} excel`;
  }

  update(id: number, updateExcelDto: UpdateExcelDto) {
    return `This action updates a #${id} excel`;
  }

  remove(id: number) {
    return `This action removes a #${id} excel`;
  }
}
