import "reflect-metadata";
import { DataSource } from "typeorm";
import { CartTable } from "./entities/CartTable";
import { ProductTable } from "./entities/ProductTable";
import { ShippingTable } from "./entities/ShippingTable";
import { UserInfoTable } from "./entities/UserInfoTable";
import { UserTableCreation } from "./entities/UserTableCreation";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "nextjs",
    synchronize: false,
    logging: false,
    entities: [
        CartTable,
        ProductTable,
        ShippingTable,
        UserInfoTable,
        UserTableCreation
    ],
    migrations: [],
    subscribers: [],
});
