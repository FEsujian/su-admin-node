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
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoAuth } from 'src/common/decorator/noAuth.decorator';

@Controller('files')
@ApiTags('通用文件上传下载接口')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @NoAuth()
  @ApiBody({
    description: '文件',
    type: UpdateFileDto,
  })
  @ApiOperation({ summary: '文件上传' })
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @Body() body: UpdateFileDto,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.filesService.upload(file, body);
  }
}
