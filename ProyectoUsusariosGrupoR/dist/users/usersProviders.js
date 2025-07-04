"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImports = void 0;
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const user_entity_1 = require("../entities/user.entity");
const rol_entity_1 = require("../entities/rol.entity");
const rol_service_1 = require("../rol/rol.service");
exports.UserImports = {
    controller: [users_controller_1.UsersController],
    providers: [users_service_1.UsersService, rol_service_1.RolService],
    entities: [user_entity_1.UserEntity, rol_entity_1.RolEntity]
};
//# sourceMappingURL=usersProviders.js.map