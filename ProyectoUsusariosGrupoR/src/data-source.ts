import { DataSource } from "typeorm";
//conexion base de datos 
export const AppDataSource = new DataSource({
    type: "postgres", // o mysql, sqlite, etc.
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "users",
    entities: ['src/entities/**/*.ts'],
    migrations: ["src/migrations/**/*.ts"],
    synchronize: false,
});


