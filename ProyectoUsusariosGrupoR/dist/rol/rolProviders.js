"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolImports = void 0;
const rol_controller_1 = require("./rol.controller");
const rol_entity_1 = require("../entities/rol.entity");
const rol_service_1 = require("./rol.service");
const permission_service_1 = require("../permission/permission.service");
const user_entity_1 = require("../entities/user.entity");
const permision_entity_1 = require("../entities/permision.entity");
exports.RolImports = {
    controllers: [rol_controller_1.RolController],
    providers: [rol_service_1.RolService, permission_service_1.PermissionService],
    entities: [rol_entity_1.RolEntity, user_entity_1.UserEntity, permision_entity_1.PermissionEntity]
};
//# sourceMappingURL=rolProviders.js.map