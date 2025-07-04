import { PermissionEntity } from "src/entities/permision.entity";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { RolEntity } from "src/entities/rol.entity";
export declare const PermissionImports: {
    controller: (typeof PermissionController)[];
    providers: (typeof PermissionService)[];
    entities: (typeof PermissionEntity | typeof RolEntity)[];
};
