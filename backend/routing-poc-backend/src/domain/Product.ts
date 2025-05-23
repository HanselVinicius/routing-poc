import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column({ type: 'uuid' })
  sku: string;
  @Column({ type: 'money' })
  price: bigint;
  @Column()
  name: string;
}
