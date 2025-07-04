"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "users",
    entities: ['src/entities/**/*.ts'],
    migrations: ["src/migrations/**/*.ts"],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map