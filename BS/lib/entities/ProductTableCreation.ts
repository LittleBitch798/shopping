import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ProductTable")
export class ProductTableCreation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar", length: 255 })
    mainImageUrl!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt!: Date;
}