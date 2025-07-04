import { Controller, Post,Get,Delete,Put,Patch,Body,Param, UseGuards } from '@nestjs/common';
import { MenuEntity } from '../entities/menu.entity';
import { MenuService } from './menu.service';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import {Permissions} from '../middlewares/decorators/permissions.decorator'
import { MenuDTO } from 'src/interface/menu.dt';


//Definimos los metodos HTTP con los authguard y sus respectivos endpoints
@Controller('menu') // endpoint para acceder a menu
export class MenuController {
    constructor(private readonly MenuService:MenuService ){}

    /* 
    Decorador useguard valida que el usuario este logueado con token 
    y Decorador Permission que verifica si el usuario tenga el permiso
    */

    @UseGuards(AuthGuard) // verifica que el usuario este logueado
    @Permissions('create_menu') // verifica que tenga el permiso requerido
    @Post('') //endpoint para post para asegurar la ruta
    create(@Body() createMenu : MenuDTO){
        return this.MenuService.create(createMenu) //invoca al metodo definido en el MenuService
    }
     
    // El metodo devuelve una promesa de tipo Menu  entity
    @Get()
    findAll(): Promise<MenuEntity[]>{
        return this.MenuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number):Promise<MenuEntity |null>{
        return this.MenuService.findOne(id);
    }
    
    @UseGuards(AuthGuard)
    @Permissions('mod_menu')
    @Put(':id')
    update(@Param('id') id: number,@Body() Menu:MenuEntity):Promise<MenuEntity>{
        return this.MenuService.update(id,Menu)
    }
    
    
    //utilizamos el Partial para poder especificar que el ingreso sera de una
    //entidad parcial que puede o no tener todos los datos 
    //el param extrae de la url el id    
    
    @UseGuards(AuthGuard)
    @Permissions('mod_menu')       
    @Patch(':id')
    updatepartial(@Param('id') id:number,@Body() menu:Partial<MenuEntity>):Promise<MenuEntity>{
        return this.MenuService.updatePartion(id,menu);
    }

    //El promise void no devuelve ningun objeto como tal, sino que es un metodo que ejecuta una accion

    @UseGuards(AuthGuard)
    @Permissions('borrar_menu')
    @Delete(':id')
    delete(@Param('id') id:number):Promise<void>{
        return this.MenuService.deleteMenu(id);
    }

}
