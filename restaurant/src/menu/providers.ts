import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { MenuEntity } from "src/entities/menu.entity";

//exportamos para que otros modulos que importen estos componentes
export const menuImports={
    controllers: [MenuController], //controlador que utiliza
    providers: [MenuService], //Servicios que posee
    entities:[MenuEntity] //Entidades que utiliza
}