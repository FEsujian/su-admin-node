import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponseDto } from '../dto/common.dto';
import { PaginatedDto } from '../dto/page.dto';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。',
};
// 通用响应参数返回
export const ApiCommonResponse = () => {
  const messageList: any = Array.from(Object.keys(codeMessage)).map(
    (v: string) => {
      return ApiResponse({
        status: Number(v),
        description: codeMessage[v],
        type: v === '200' ? CommonResponseDto : null,
      });
    },
  );
  return applyDecorators(...messageList);
};
// 分页返回封装
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
