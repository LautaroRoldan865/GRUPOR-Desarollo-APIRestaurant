import { Body, Controller, Post, Req, UseGuards, Get, Put, Patch, Delete, Param } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from '../middlewares/decorators/permissions.decorator'
import { RolService } from './rol.service';
import { RolEntity } from 'src/entities/rol.entity';
import { PermissionEntity } from 'src/entities/permision.entity';


interface RequestWithRol extends Request{
    rol: RolEntity
}

interface Intpermision{
    id:number
}

@Controller('rol')
export class RolController {
    constructor (private readonly service: RolService){}

    /*Definimos el metodo post para crear un rol y le asignamos el decorador para que verifique si ese usuario 
    tiene el permiso para crear un rol
    */
    @UseGuards(AuthGuard)
    @Permissions(['create_role'])
    @Post()
    async create(@Req()request: RequestWithRol){
        return this.service.create(request.rol)
    }

    //Definimos el metodo con el cual se agrega un permiso a un rol determinado
    @UseGuards(AuthGuard)
    @Permissions(['assign_permission'])
    @Post(':id')
    async addPermision(@Param('id') id:number,@Body() Permission: Intpermision){
        return this.service.addPermision(id,Permission.id)
    }

    //Metodo con el cual se puede conocer todos los roles definidos
    @Get()
    findAll(): Promise<RolEntity[]>{
        return this.service.findAll()
    }

    //Metodo que busca un rol por su id
    @Get(':id')
    findOne(@Param('id') id:number):Promise<RolEntity |null>{
        return this.service.findOne(id);
    }

    //Metodo con el cual se busca un permiso por medio de su id
    @Get(':id')
    findPermissions(@Param('id') id:number):Promise<PermissionEntity[]>{
        return this.service.findPermissions(id);
    }

    //Metodo para actualizar completamente un rol 
    @Put(':id')
    update(@Param('id') id: number,@Body() rol:RolEntity):Promise<RolEntity>{
        return this.service.update(id,rol)
    }

    //Metodo con el cual se actualiza un determinado rol
    @Patch(':id')
    updatepartial(@Param('id') id:number,@Body() rol:Partial<RolEntity>):Promise<RolEntity>{
        return this.service.updatePartion(id,rol);
    }

    // Metodo con el cual se puede borrar un determinado rol
    @Delete(':id')
    delete(@Param('id') id:number):Promise<void>{
        return this.service.delete(id);
    }

}
