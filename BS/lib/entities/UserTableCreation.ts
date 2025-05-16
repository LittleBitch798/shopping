import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("UserTable")  // 明确指定表名
export class UserTableCreation {
    @PrimaryGeneratedColumn()
    id!: number;  // 添加非空断言

    @Column({ type: "varchar", length: 10 })
    username!: string;

    @Column({ type: "varchar", length: 16 })
    password!: string;

    @Column({ type: "varchar", length: 11, unique: true })
    phone!: string;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt!: Date;
}