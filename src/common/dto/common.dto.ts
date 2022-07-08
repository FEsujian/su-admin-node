import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty({ description: '请求是否成功', type: 'boolean', example: true })
  ok: boolean;

  @ApiProperty({ description: '状态码', type: 'number', example: 200 })
  statusCode: boolean;

  @ApiProperty({ description: '消息', type: 'string', example: '操作成功' })
  message: string | null | undefined;

  @ApiProperty({ description: '请求方法', type: 'string', example: 'GET' })
  method: string;

  @ApiProperty({ description: '请求路径', type: 'string', example: '/login' })
  path: string;

  @ApiProperty({
    description: '请求时间',
    type: 'string',
    example: new Date().toISOString(),
  })
  timestamp: string | Date;

  @ApiProperty({
    description: '返回数据',
    type: 'any',
    example: [],
  })
  data: any;
}
