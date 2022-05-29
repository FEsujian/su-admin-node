import { Excel } from './entities/excel.entity';
import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const xlsx = require('node-xlsx');
const XLSXParser = require('xlsx-to-json');

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
    return this.excelRepository.findOne(id);
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
    const dataList = [];
    sheetData.forEach((item, index) => {
      if (index === 0) return; // 去除标题栏
      dataList.push({
        name: item[0], // 用户名称
        username: item[1], // 账号
        password: item[2], // 密码
        market_user_number: item[3], // 营销用户编号
        contract_number: item[4], // 合同编号
        predict: item[5], // 预估电量
        bilateral: item[6], // 双边
        bidding: item[7], // 竞价
        transfer: item[8], // 合同电量转移
        bilateral_settlement: item[9], // 双边结算
        bidding_settlement: item[10], // 竞价结算
        summary_quantity: item[11], // 总结算量
        deviation_electric: item[12], // 偏差电量
        deviation_proportion: item[13], // 偏差比例
        price_markup: item[14], // 电厂侧加权价格
        settlement: item[15], // 合同结算价格
        price_difference: item[16], // 价差
        plant_name: item[17], // 绑定电厂
        belong_company: item[18], // 用户归属
        belong_power_supply: item[19], // 所属供电局
        contacts: item[20], // 联系人
        remarks: item[21], // 备注
      });
    });
    // 合并相同项
    dataList.forEach((item, index) => {
      if (index === 0) return; // 去除标题栏
      const preItem = dataList[index - 1];
      !item.name && preItem['name'];
      !item.username && preItem['username'];
      !item.password && preItem['password'];
      !item.belong_company && preItem['belong_company'];
      !item.belong_power_supply && preItem['belong_power_supply'];
      !item.contacts && preItem['contacts'];
    });

    console.log(dataList, 'dataList');

    return dataList;
  }
}
