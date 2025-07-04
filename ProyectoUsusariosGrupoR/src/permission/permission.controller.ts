import { Controller } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { UseGuards } from '@nestjs/common';
import { Post,Get,Param,Put,Patch,Delete } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { PermissionEntity } from 'src/entities/permision.entity';
import { PermissionService } from './permission.service';
import { Body } from '@nestjs/common';


@Controller('permission')
export class PermissionController {

    constructor (private readonly service: PermissionService){}

    //Verifica si el usuario autenticado tiene el permiso de crear permisos
    @UseGuards(AuthGuard)
    @Permissions(['create_permission'])
    //Metodo post para crear un nuevo permiso
    @Post()
    async create(@Req()request: Request,@Body() Permissions: PermissionEntity){
        return this.service.createPermission(Permissions)
    }

    //Metodo que trae los permisos y devuelvve promise de tipo permission entity
    @Get()
    findAll(): Promise<PermissionEntity[]>{
        return this.service.findAll()
    }

    //Metodo con el cual buscamos un permiso identificandolo por su id    
    @Get(':id')
    findOne(@Param('id') id:number):Promise<PermissionEntity |null>{
        return this.service.findOne(id);
    }

    //Metodo para actualizar un  permission entity
    @Put(':id')
    update(@Param('id') id: number,@Body() permiso:PermissionEntity):Promise<PermissionEntity>{
        return this.service.update(id,permiso)
    }

    //Metodo con el caul modificamos de forma parcial un permiso
    //Especificando los cambios en el partial PermissionEntity    
    
    @Patch(':id')
    updatepartial(@Param('id') id:number,@Body() permiso:Partial<PermissionEntity>):Promise<PermissionEntity>{
        return this.service.updatePartion(id,permiso);
    }
    //Metodo para borrar un permiso, es de tipo void ya que no devuelve una entity
    @Delete(':id')
    delete(@Param('id') id:number):Promise<void>{
        return this.service.delete(id);
    }
    
}
