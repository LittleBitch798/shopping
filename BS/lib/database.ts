import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { UserTableCreation } from "./entities/UserTableCreation";
import { ProductTableCreation } from "./entities/ProductTableCreation";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "nextjs",
    synchronize: false ,//同步数据库结构
    logging: false ,
    entities: [ProductTableCreation,User,UserTableCreation,],
    migrations: [],
    subscribers: [],
});
