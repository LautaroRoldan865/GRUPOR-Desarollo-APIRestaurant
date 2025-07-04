import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permision.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common'; 
import { RolEntity } from 'src/entities/rol.entity';


@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(PermissionEntity)
        private PersmissionRepo : Repository<PermissionEntity>, 
    ){}

    //Metodo que tiene la logica para crear un permiso, 
    async createPermission(permission: Partial<PermissionEntity>){
        const newPermission = this.PersmissionRepo.create(permission)
        return await this.PersmissionRepo.save(newPermission)
    }

    //Definimos la logica con la cual se buscan todos los permisos existentes    
    async findAll():Promise<PermissionEntity[]>{
        return await this.PersmissionRepo.find()
    }

    //Definimos la logica con la cual buscamos un permiso por medio de su id
    async findOne(id:number):Promise<PermissionEntity| null>{
        return await this.PersmissionRepo.findOneBy({id})
    }

    //Metodo que tiene la logica del patch para actualizar una entity completamente
    async update(id:number, permission:PermissionEntity):Promise<PermissionEntity>{
        await this.PersmissionRepo.update(id,permission);
        return this.PersmissionRepo.findOneByOrFail({id});
    }

    //Metodo que busca todos los permisos de un un rol por su id
    async filterService(id:number):Promise<PermissionEntity[]>{

        let permission = await this.PersmissionRepo.find()

        function permissionFilter(rol:number){
            return permission.filter((permission)=> permission.rol.every((Role)=>Role.id === rol))
        }

        return permissionFilter(id);
    }

    
    //Definimos la logica con la cual vamos a poder actualizar un rol
    async updatePartion(id:number,permission:Partial<PermissionEntity>):Promise<PermissionEntity>{
        await this.PersmissionRepo.update(id,permission);
        return this.PersmissionRepo.findOneByOrFail({id});
    }

    //Definios la logica para borrar un permission entity, es de tipo void ya que no devuelve nada 
    async delete(id:number):Promise<void>{
        const permission = await this.PersmissionRepo.findOneBy({id})
        if(!permission){
            throw new NotFoundException(`permission not exist with the id: ${id}`);
        }
        await this.PersmissionRepo.delete(permission.id);
    }
}
