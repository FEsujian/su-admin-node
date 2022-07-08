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
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NoAuth } from 'src/common/decorator/noAuth.decorator';

@Controller('excel')
@ApiTags('处理Excel相关接口')
export class ExcelController {
  constructor(private readonly excelService) {}

  @Get()
  @NoAuth()
  findAll(@Req() request: Request) {
    // return this.excelService.findAll(request.query);
    return this.excelService.findByPage(request.query);
  }
}
