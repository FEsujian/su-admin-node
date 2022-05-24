import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoAuth } from 'src/common/decorator/noAuth.decorator';

@Controller('excel')
@ApiTags('处理Excel相关接口')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post()
  create(@Body() createExcelDto: CreateExcelDto) {
    return this.excelService.create(createExcelDto);
  }

  @Get()
  @NoAuth()
  findAll() {
    return this.excelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.excelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExcelDto: UpdateExcelDto) {
    return this.excelService.update(+id, updateExcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excelService.remove(+id);
  }
}
