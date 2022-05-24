import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('base_sys_user')
export class Excel {
  @PrimaryGeneratedColumn()
  id: number;
}
