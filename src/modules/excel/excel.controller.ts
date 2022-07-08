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
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiExtension,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { NoAuth } from 'src/common/decorator/noAuth.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiCommonResponse,
  ApiPaginatedResponse,
} from 'src/common/decorator/swagger.decorator';
import { CommonResponseDto } from 'src/common/dto/common.dto';

@Controller('excel')
@ApiTags('处理Excel相关接口')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @NoAuth()
  @ApiOperation({
    tags: ['获取用户信息'],
    description: '获取用户信息',
    deprecated: false,
    requestBody: {
      description: '1111',
      content: {},
      required: true,
    },
  })
  @ApiBody({
    // name: '请求参数',
    description: '请求参数',
    type: CreateExcelDto,
  })
  @ApiCommonResponse()
  @UseInterceptors(AnyFilesInterceptor())
  importExcel(
    @Body() body: CreateExcelDto,
    @UploadedFiles() file: Express.Multer.File,
  ): any {
    return {
      a: 1,
    };
    // const dataList = this.excelService.analysis(file);
    // dataList.forEach((v) => {
    //   this.excelService.create(v);
    // });
    // return dataList;
  }

  @Post('upload2')
  @NoAuth()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBody({
    description: '请求参数',
    type: CreateExcelDto,
  })
  importExcel2(@Body() body, @UploadedFiles() file: Express.Multer.File) {
    return {
      a: 1,
      b: 2,
    };
  }

  @Post()
  create(@Body() createExcelDto: CreateExcelDto) {
    return this.excelService.create(createExcelDto);
  }

  @Get()
  @NoAuth()
  @ApiOperation({
    tags: ['获取用户信息'],
    description: '获取用户信息',
    deprecated: true,
  })
  // @ApiQuery({ name: 'id', description: '用户id', type: CreateExcelDto })
  @ApiParam({ name: 'params', type: CreateExcelDto })
  @ApiResponse({ description: '成功请求回来,其实就是200的描述', status: 200 })
  @ApiOkResponse({ description: '成功请求回来' })
  findAll(@Req() request: Request) {
    // return this.excelService.findAll(request.query);
    return this.excelService.findByPage(request.query);
  }

  @Get(':id')
  @NoAuth()
  findOne(@Param('id') id: string) {
    return this.excelService.findOne(+id);
  }

  @Patch(':id')
  @NoAuth()
  update(@Param('id') id: string, @Body() updateExcelDto: UpdateExcelDto) {
    return this.excelService.update(+id, updateExcelDto);
  }

  @Delete(':id')
  @NoAuth()
  remove(@Param('id') id: string) {
    return this.excelService.remove(+id);
  }
}
