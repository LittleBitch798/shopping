import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { UserTableCreation } from "./entities/UserTableCreation";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "nextjs",
    synchronize: false,
    logging: false,
    entities: [User,UserTableCreation],
    migrations: [],
    subscribers: [],
});
