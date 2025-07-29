import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("CartTable")
export class CartTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 11 })
    phone!: string; // 关联用户手机号

    @Column({ type: "varchar", length: 100 })
    productName!: string; // ✅ 该字段定义正确

    @Column({ type: "varchar", length: 500 })
    description!: string; // 商品描述

    @Column({ type: "varchar", length: 500 })
    imageUrl!: string; // 商品图片地址

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number; // 商品单价
    
    @Column({ 
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;
}

/* MySQL建表命令：
    CREATE TABLE CartTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(11),
        productName VARCHAR(100),
        description VARCHAR(500),
        imageUrl VARCHAR(500),
        price DECIMAL(10,2),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    */