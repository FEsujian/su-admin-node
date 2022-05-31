import { BaseEntity } from 'src/common/entity/index.entity';
import { Entity, Column } from 'typeorm';
@Entity('excel')
export class Excel extends BaseEntity {
  @Column()
  name: string; // 用户名称
  @Column()
  username: string; // 账号
  @Column()
  password: string; // 密码
  @Column()
  market_user_number: string; // 营销用户编号
  @Column()
  contract_number: string; // 合同编号
  @Column()
  predict: string; // 预估电量
  @Column()
  bilateral: string; // 双边
  @Column()
  bidding: string; // 竞价
  @Column()
  transfer: string; // 合同电量转移
  @Column()
  bilateral_settlement: string; // 双边结算
  @Column()
  bidding_settlement: string; // 竞价结算
  @Column()
  summary_quantity: string; // 总结算量
  @Column()
  deviation_electric: string; // 偏差电量
  @Column()
  deviation_proportion: string; // 偏差比例
  @Column()
  price_markup: string; // 电厂侧加权价格
  @Column()
  settlement: string; // 合同结算价格
  @Column()
  price_difference: string; // 价差
  @Column()
  plant_name: string; // 绑定电厂
  @Column()
  belong_company: string; // 用户归属
  @Column()
  belong_power_supply: string; // 所属供电局
  @Column()
  contacts: string; // 联系人
  @Column({
    nullable: true,
  })
  remarks: string | null; // 备注
}
