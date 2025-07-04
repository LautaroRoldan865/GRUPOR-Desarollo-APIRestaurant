import { TypeOrmModule } from "@nestjs/typeorm";
import { RolController } from "./rol.controller";
import { RolEntity} from "src/entities/rol.entity";
import { RolService } from "./rol.service";
import { Controller } from "@nestjs/common";
import { entities } from "src/entities";
import { PermissionService } from "src/permission/permission.service";
import { UserEntity } from "src/entities/user.entity";
import { PermissionEntity } from "src/entities/permision.entity";

//Esto es para que otros modulos puedan importarlo
export const RolImports={
    controllers: [RolController],
    providers: [RolService,PermissionService],
    entities: [RolEntity,UserEntity,PermissionEntity]
}
