"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionImports = void 0;
const permision_entity_1 = require("../entities/permision.entity");
const permission_service_1 = require("./permission.service");
const permission_controller_1 = require("./permission.controller");
const rol_entity_1 = require("../entities/rol.entity");
exports.PermissionImports = {
    controller: [permission_controller_1.PermissionController],
    providers: [permission_service_1.PermissionService],
    entities: [permision_entity_1.PermissionEntity, rol_entity_1.RolEntity]
};
//# sourceMappingURL=permissionProviders.js.map