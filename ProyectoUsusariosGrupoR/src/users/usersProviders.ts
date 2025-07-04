import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserEntity } from "src/entities/user.entity";
import { RolEntity } from "src/entities/rol.entity";
import { RolService } from "src/rol/rol.service";

//Definimos para que los otros modulos puedan importarlo
export const UserImports={
    controller:[UsersController],
    providers:[UsersService,RolService],
    entities:[UserEntity,RolEntity]
}