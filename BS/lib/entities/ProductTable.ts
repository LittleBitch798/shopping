import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ProductTable")
export class ProductTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    productName!: string;

    @Column({ type: "varchar", length: 500 })
    description!: string;

    @Column({ type: "varchar", length: 500, name: "image_url" })
    imageUrl!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ 
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;
}

 /* MySQL建表命令：
    CREATE TABLE ProductTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(100),
        description VARCHAR(500),
        image_url VARCHAR(500),
        price DECIMAL(10,2),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    */