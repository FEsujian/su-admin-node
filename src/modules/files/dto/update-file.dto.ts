import { PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';
import {
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
} from 'class-validator';
export class UpdateFileDto extends PartialType(CreateFileDto) {
  file;
}
