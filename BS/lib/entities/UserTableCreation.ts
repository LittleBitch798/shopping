import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("UserTable")  // 明确指定表名
export class UserTableCreation {
    @PrimaryGeneratedColumn()
    id!: number;  // 添加非空断言

    @Column({ type: "varchar", length: 10 })
    username!: string;//用户名

    @Column({ type: "varchar", length: 16 })
    password!: string;//密码

    @Column({ type: "varchar", length: 11, unique: true })
    phone!: string; // 唯一手机号（UNIQUE约束）
    
    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt!: Date;
}


    /* MySQL建表命令：
    CREATE TABLE UserTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(10),
        password VARCHAR(16),
        phone VARCHAR(11) UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    */