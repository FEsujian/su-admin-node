import { CreateDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 模型基类
 */
export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;
  @Index()
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;
  @Index()
  @CreateDateColumn({ comment: '更新时间' })
  updateTime: Date;
}
