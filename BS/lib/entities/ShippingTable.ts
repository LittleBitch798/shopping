import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ShippingTable")
export class ShippingTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    productId!: number;

    @Column({ type: "varchar", length: 500 })
    address!: string;


    @Column({ type: "varchar", length: 11 })
    phone!: string;

    @Column({ type: "varchar", length: 100 })
    productName!: string;

    @Column({ type: "varchar", length: 500 })
    description!: string;

    @Column({ type: "varchar", length: 500 })
    imageUrl!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ type: "varchar", length: 50 })
    trackingNumber!: string; // 快递单号

    @Column({ type: "varchar", length: 20 })
    shippingStatus!: string; // 物流状态（如：已发货/运输中/已签收）

    @Column({ type: "varchar", length: 50 })
    shippingCompany!: string; // 物流公司名称
    
    @Column({ 
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;
}

/* MySQL建表命令：
   CREATE TABLE ShippingTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    address VARCHAR(500),
    phone VARCHAR(11),
    productName VARCHAR(100),
    description VARCHAR(500),
    imageUrl VARCHAR(500),
    price DECIMAL(10,2),
    trackingNumber VARCHAR(50),
    shippingStatus VARCHAR(20),
    shippingCompany VARCHAR(50),
    createdAt TIMESTAMP
);
    */