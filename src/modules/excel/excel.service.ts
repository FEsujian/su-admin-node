import { Excel } from './entities/excel.entity';
import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const xlsx = require('node-xlsx');

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Excel)
    private excelRepository: Repository<Excel>,
  ) {}
  create(createExcelDto: CreateExcelDto) {
    return this.excelRepository.insert(createExcelDto);
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

  analysis(file) {
    const filePath = file[0].path;
    const sheets = xlsx.parse(filePath);
    const sheetData = sheets[0].data;
    const xlsxHeaderMap = {
      username: '用户名',
      age: '年龄',
      sex: '性别',
      idcard: '身份证号',
      id: 'id',
    };
    const dataList = [];
    sheetData.forEach((item, index) => {
      if (index === 0) return; // 去除标题栏
      dataList.push({
        username: item[0],
        age: item[1],
        sex: item[2],
        idcard: item[3],
        id: item[4],
      });
    });

    return dataList;
  }
}
