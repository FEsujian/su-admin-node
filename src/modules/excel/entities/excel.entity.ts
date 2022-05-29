import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('excel')
export class Excel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // username: string;

  // @Column()
  // password: string;

  // @Column()
  // market_user_number: string;

  // @Column()
  // contract_number: string;

  // @Column()
  // predict: string;

  // @Column()
  // bilateral: string;

  // @Column()
  // bidding: string;

  // @Column()
  // transfer: string;

  // @Column()
  // bidding_settlement: string;

  // @Column()
  // summary_quantity: string;

  // @Column()
  // bilateral_settlement: string;

  // @Column()
  // deviation_electric: string;

  // @Column()
  // price_markup: string;

  // @Column()
  // deviation_proportion: string;

  // @Column()
  // price_difference: string;

  // @Column()
  // settlement: string;

  // @Column()
  // address: string;

  // @Column()
  // plant_name: string;

  // @Column()
  // belong_company: string;

  // @Column()
  // belong_power_supply: string;

  // @Column()
  // contacts: string;

  // @Column()
  // remarks: string;
}
