import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    example: '1234',
  })
  id: string;
}
