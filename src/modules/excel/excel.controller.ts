import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoAuth } from 'src/common/decorator/noAuth.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('excel')
@ApiTags('处理Excel相关接口')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @NoAuth()
  @UseInterceptors(AnyFilesInterceptor())
  importExcel(@Body() body, @UploadedFiles() file: Express.Multer.File) {
    const dataList = this.excelService.analysis(file);
    dataList.forEach((v) => {
      this.excelService.create(v);
    });
    return dataList;
  }

  @Post('upload2')
  @NoAuth()
  @UseInterceptors(AnyFilesInterceptor())
  importExcel2(@Body() body, @UploadedFiles() file: Express.Multer.File) {
    console.log(file, 'file');
    return true;
  }

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
  @NoAuth()
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
