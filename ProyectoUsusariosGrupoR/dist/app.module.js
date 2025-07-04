"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const jwt_service_1 = require("./jwt/jwt.service");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const rolProviders_1 = require("./rol/rolProviders");
const permissionProviders_1 = require("./permission/permissionProviders");
const usersProviders_1 = require("./users/usersProviders");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'postgres',
                database: 'users',
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([...permissionProviders_1.PermissionImports.entities, ...rolProviders_1.RolImports.entities, ...usersProviders_1.UserImports.entities]),
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, ...rolProviders_1.RolImports.controllers, ...permissionProviders_1.PermissionImports.controller, ...usersProviders_1.UserImports.controller],
        providers: [auth_middleware_1.AuthGuard, jwt_service_1.JwtService, users_service_1.UsersService, ...rolProviders_1.RolImports.providers, ...permissionProviders_1.PermissionImports.providers, ...usersProviders_1.UserImports.providers],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map