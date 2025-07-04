import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { RestaurantEntity } from "src/entities/restaurant.entity";
import { MenuService } from "src/menu/menu.service";
import { AddressEntity } from "src/entities/address.entity";
import { LocationEntity } from "src/entities/location.entity";

//exportamos para que otros modulos que importen estos componentes puedan verlo
export const RestaurantImports= {
    controllers: [RestaurantController],
    providers: [RestaurantService],
entities:[RestaurantEntity,AddressEntity,LocationEntity]} 