import { Entity,Column,PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product{   

    @PrimaryGeneratedColumn()
    id:BigInt;
    @Column({ type: "uuid", default: () => "uuid_generate_v4()" })
    sku:String;
    @Column()
    price:BigInt;
    @Column()
    name:String;
}