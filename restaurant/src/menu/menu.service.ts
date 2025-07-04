import { Body, HttpException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { MenuDTO } from 'src/interface/menu.dt';


@Injectable()
export class MenuService {
    constructor(
        //conecta con el repositorio que tiene los datos
        @InjectRepository(MenuEntity)
        private menuRepo: Repository<MenuEntity>,   
    ){}
    //Logica del motodo POST con validacion de datos de entrada con DTO
    async create(menu:MenuDTO){
        try{
            const newMenu = new MenuEntity(); //crea una nueva instancia de menu
            Object.assign(newMenu,menu); 
            await this.menuRepo.save(newMenu); //guarda en el repositorio el nuevo menu y es await ya que el save no instantaneo
            return { status: 'created' }; // Devuelve el status created si se realizo con exito
        } catch (error) {
            throw new HttpException('Error de creacion', 500); // Devuelve un error si es que se presento alguna falla
        }
    }

    ///Tiene la logica del metodo GET y devuelve todos los menus
    findAll():Promise<MenuEntity[]>{
        return this.menuRepo.find();
    }

    //Metodo definido para filtrar un determinado menu segun el id de su restaurante    
    
    async filterMenu(id:number):Promise<MenuEntity[]>{
        let Menus = await this.menuRepo.find()
        function menufiltrado(restaurant:number){
            return Menus.filter((menu) => menu.restaurant.id = restaurant);
        }
        return menufiltrado(id);
    }

    //Define la logica del metodo GET para un menu con el id
    findOne(id:number):Promise<MenuEntity |null>{
        return this.menuRepo.findOneBy({id});
    }

    //Define la logica del metodo PUT, reemplaza completo la instancia de un menu 
    async update(id:number, menu:MenuEntity):Promise<MenuEntity>{
        await this.menuRepo.update(id,menu);
        return this.menuRepo.findOneByOrFail({id});
    }
    //Define la logica del metodo PUT, actualiza parcial la instancia de un menu
    async updatePartion(id:number,menu:Partial<MenuEntity>):Promise<MenuEntity>{
        await this.menuRepo.update(id,menu);
        return this.menuRepo.findOneByOrFail({id});
    }
    
    //Define la logica para la eliminacion de un determinado menu
    async deleteMenu(id:number):Promise<void>{
        const menu = await this.menuRepo.findOneBy({id})
        if(!menu){
            throw new NotFoundException(`menu not exist with the id: ${id}`);
        }
        await this.menuRepo.delete(menu.id);  
    }

}
