import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('excel')
export class Excel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  age: number;
  @Column()
  username: string;
  @Column()
  sex: string;
  @Column()
  idcard: string;
}
