import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionEntity } from "src/entities/permision.entity";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { entities } from "src/entities";
import { RolEntity } from "src/entities/rol.entity";
import { RolService } from "src/rol/rol.service";

//Exportamos los componentes de este modulo para que otros puedan importarlos
export const PermissionImports={
    controller:[PermissionController],
    providers:[PermissionService],
    entities:[PermissionEntity,RolEntity]
}