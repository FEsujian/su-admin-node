import { ApiTags, ApiParam, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateExcelDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: '用户名',
    example: 'root',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;
  @ApiProperty({
    type: 'string',
    required: true,
    description: '密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;
}
