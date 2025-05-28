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
    phone!: string;//手机号

    @Column({ 
        type: "varchar", 
        length: 255,  // 增加长度以容纳多个商品ID
        default: "[]" // 默认值为空数组的JSON字符串
    })
    shopCar!: string;//购物车商品ID列表，存储为JSON字符串

    @Column({
        type: "varchar", // varchar
        length: 255,
        default: '[]' // 默认空数组
    })
    shippingInfo!: string; // 物流信息，存储为JSON数组
    
    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt!: Date;
}