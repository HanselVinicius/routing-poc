import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: BigInt;
    @Column({ type: "uuid" })
    sku: String;
    @Column({ type: "money" })
    price: BigInt;
    @Column()
    name: String;
}