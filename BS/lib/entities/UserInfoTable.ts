import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

interface AdditionalInfo {
  shippingInfo?: Array<{
    id: number;
    productId: number;
    address: string;
    status: 'pending' | 'shipped' | 'delivered';
    createdAt: Date;
  }>;
}

@Entity("UserInfoTable")
export class UserInfoTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 10 })
    username!: string;

    @Column({ type: "varchar", length: 16 })
    password!: string;

    @Column({ type: "varchar", length: 11, unique: true })
    phone!: string;

    @Column({ type: "json", nullable: true })
    additionalInfo!: AdditionalInfo;
    
    @Column({ 
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;
}

/* MySQL建表命令：
    CREATE TABLE UserInfoTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(10),
        password VARCHAR(16),
        phone VARCHAR(11) UNIQUE,
        additionalInfo JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    */