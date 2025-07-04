import { RolController } from "./rol.controller";
import { RolEntity } from "src/entities/rol.entity";
import { RolService } from "./rol.service";
import { PermissionService } from "src/permission/permission.service";
import { UserEntity } from "src/entities/user.entity";
import { PermissionEntity } from "src/entities/permision.entity";
export declare const RolImports: {
    controllers: (typeof RolController)[];
    providers: (typeof PermissionService | typeof RolService)[];
    entities: (typeof PermissionEntity | typeof RolEntity | typeof UserEntity)[];
};
