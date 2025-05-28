import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ProductTable")
export class ProductTableCreation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar" })
    mainImageUrl!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt!: Date;

    @Column({ type: "varchar", length:100})
    price!: string;
}

//建表指令 URL长度需要注意
// CREATE TABLE `ProductTable` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `name` varchar(100) NOT NULL,
//   `description` text NOT NULL,
//   `mainImageUrl` varchar(5000) NOT NULL,
//   `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `price` varchar(100) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;