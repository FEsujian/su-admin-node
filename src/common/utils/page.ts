import { RpcException } from '@nestjs/microservices';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityManager, getManager, SelectQueryBuilder } from 'typeorm';

export default class Pagination {
  @IsNotEmpty()
  @ApiProperty({ description: '页码', type: 'number', example: 1 })
  private pageNum: number;
  @ApiProperty({ description: '一页显示条数', type: 'number', example: 10 })
  private pageSize: number;
  @ApiProperty({ description: '总页数', type: 'number', example: 10 })
  private totalNum: number;
  @ApiProperty({ description: '总条数', type: 'number', example: 10 })
  private totalRows: number;
  @ApiProperty({
    description: '是否是第一页',
    type: 'boolean',
    example: true,
  })
  private firstPage: number;
  @ApiProperty({
    description: '是否包含下一页',
    type: 'boolean',
    example: true,
  })
  private hasNextPage: number;
  @ApiProperty({
    description: '是否包含上一页',
    type: 'boolean',
    example: true,
  })
  private hasPreviousPage: number;
  @ApiProperty({
    description: '是否是最后一页',
    type: 'boolean',
    example: true,
  })
  private lastPage: number;
  @ApiProperty({ description: '数据' })
  public list?: any[];

  public get _pageNum(): number {
    return this.pageNum;
  }

  public set _pageNum(param: number) {
    if (param <= 0) {
      param = 1;
    }
    // if (param > this._totalNum) {
    //     param = this._totalNum;
    // }
    this.pageNum = param;
  }

  public get _pageSize() {
    return this.pageSize;
  }

  public set _pageSize(param: number) {
    this.pageSize = param;
  }

  public get _totalRows() {
    return this.totalRows;
  }

  public set _totalRows(param: number) {
    this.totalRows = param;
  }

  public get _totalNum() {
    return this.totalNum;
  }

  public set _totalNum(param: number) {
    this.totalNum = param;
  }

  /**
   * queryBuilder分页查询
   * @param pageHelper
   * @param pageHelper.getRayMany 是否需要实体之外的参数
   * @param queryBuilder
   */
  public static async findByPage(
    queryBuilder: SelectQueryBuilder<any>,
    pageHelper?: { getRayMany?: boolean; pageNum?: number; pageSize?: number },
  ): Promise<Pagination> {
    if (!pageHelper) {
      pageHelper = {};
    }
    const pagination = new Pagination();
    if (queryBuilder.getSql().includes('GROUP BY')) {
      const sql = queryBuilder.getSql();
      const selectFields = sql.slice(
        sql.indexOf('SELECT ') + 7,
        sql.indexOf(' FROM'),
      );
      const countSql = sql.replace(selectFields, '1');
      const execSql = sql.includes('ORDER BY')
        ? countSql.substring(0, countSql.indexOf('ORDER BY'))
        : countSql;
      pagination._totalRows = +(
        await getManager().query(
          `select count(1) as 'cnt' from (${execSql}) a`,
          Object.values(queryBuilder.getParameters()),
        )
      )[0].cnt;
    } else {
      pagination._totalRows = await queryBuilder.getCount();
    }
    pagination._pageSize =
      pageHelper.pageSize && pageHelper.pageSize > 0
        ? +pageHelper.pageSize
        : 10;
    pagination._totalNum = Math.ceil(
      pagination._totalRows / pagination._pageSize,
    );
    const pageNum =
      pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1;
    pagination._pageNum =
      pageNum < pagination._totalNum ? +pageNum : +pagination._totalNum;
    queryBuilder.limit(pagination._pageSize);
    queryBuilder.offset(
      Number((pagination._pageNum - 1) * pagination._pageSize),
    );
    pagination.list = pageHelper.getRayMany
      ? await queryBuilder.getRawMany()
      : await queryBuilder.getMany();
    return pagination;
  }

  /**
   * 原生SQL分页
   * @param sql    sql语句
   * @param entityManager
   * @param parameters    查询参数
   * @param pageHelper    分页参数
   */
  public static async findByPageNativeSql(
    sql: string,
    entityManager: EntityManager,
    parameters?: any[],
    pageHelper?: { getRayMany?: boolean; pageNum?: number; pageSize?: number },
  ): Promise<Pagination> {
    pageHelper = !pageHelper ? {} : pageHelper;
    parameters = !parameters ? [] : parameters;
    const pagination = new Pagination();

    /** SELECT 在SQL中的位置 */
    let selectIndex = sql.indexOf('SELECT');
    selectIndex = selectIndex === -1 ? sql.indexOf('select') : selectIndex;
    /** FROM 在SQL中的位置 */
    let fromIndex = sql.indexOf('FROM');
    fromIndex = fromIndex === -1 ? sql.indexOf('from') : fromIndex;
    // 判断SQL中是否包含 SELECT/FROM
    if (selectIndex === -1 || fromIndex === -1) {
      throw new RpcException('sql is invalid!');
    }

    if (sql.includes('GROUP BY') || sql.includes('group by')) {
      // 分组查询计数
      /** 去掉子查询中多余的排序 */
      const subSelect = sql.includes('ORDER BY')
        ? sql.substring(0, sql.indexOf('ORDER BY'))
        : sql;
      pagination._totalRows = +(
        await getManager().query(
          `select count(1) as 'cnt' from (${subSelect}) a`,
          parameters.splice(sql.split('?').length - 1),
        )
      )[0].cnt;
    } else {
      /** 查询的字段 */
      const selectFields = sql.slice(selectIndex + 6, fromIndex);
      /** 替换查询字段:前后必须要加空格 */
      const countSql = sql.replace(selectFields, ' count(1) as cnt ');
      pagination._totalRows = +(
        await getManager().query(
          countSql,
          parameters.splice(sql.split('?').length - 1),
        )
      )[0].cnt;
    }
    pagination._pageSize =
      pageHelper.pageSize && pageHelper.pageSize > 0
        ? +pageHelper.pageSize
        : 10;
    pagination._totalNum = Math.ceil(
      pagination._totalRows / pagination._pageSize,
    );
    const pageNum =
      pageHelper.pageNum && pageHelper.pageNum > 0 ? +pageHelper.pageNum : 1;
    pagination._pageNum =
      pageNum < pagination._totalNum ? +pageNum : +pagination._totalNum;
    // SQL添加分页参数
    sql =
      sql +
      ' limit ' +
      (pagination._pageNum - 1) * pagination._pageSize +
      ',' +
      pagination._pageSize;
    pagination.list = await entityManager.query(sql, parameters);
    return pagination;
  }
}
