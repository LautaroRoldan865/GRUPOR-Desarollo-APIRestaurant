import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { MenuEntity } from 'src/entities/menu.entity';
import { AddressEntity } from 'src/entities/address.entity'; 
import { LocationEntity } from '../entities/location.entity';
import { MenuService } from 'src/menu/menu.service';
import {paginate,Pagination,IPaginationOptions} from 'nestjs-typeorm-paginate';



@Injectable()
export class RestaurantService {
    constructor(
        //injetamos el repositorio para acceder a los datos de restaurante
        @InjectRepository(RestaurantEntity)
        private restaurantRepository: Repository<RestaurantEntity>,

        //injectamos la address entity
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,

        //injectamos la location address
        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>,

        private menuService:MenuService
    ) {}

    
    //metodo que busca todos los restaurantes
    findAll():Promise<RestaurantEntity[]>{
        return this.restaurantRepository.find();
    }
    //metodo que busca un solo restaurant por su id
    findOne(id:number):Promise<RestaurantEntity |null>{
        return this.restaurantRepository.findOneBy({id});
    }

    //Define la logica del metodo PUT, reemplaza completo la instancia de un restaurante
    async update(id:number, restaurant:RestaurantEntity):Promise<RestaurantEntity>{
        await this.restaurantRepository.update(id,restaurant);
        return this.restaurantRepository.findOneByOrFail({id});
    }

    
    //Define la logica del metodo PATCH, reemplaza parcialmente la instancia de un restaurante
    async updatePartion(id:number,restaurant:Partial<RestaurantEntity>):Promise<RestaurantEntity>{
        await this.restaurantRepository.update(id,restaurant);
        return this.restaurantRepository.findOneByOrFail({id});
    }

    //Define la logica para la eliminacion de un determinado restaurante
    async delete(id:number):Promise<void>{
        const restaurant = await this.restaurantRepository.findOneBy({id})

        if(!restaurant){
            throw new NotFoundException(`restaurant not exist with the id: ${id}`);
        }

        await this.restaurantRepository.softRemove(restaurant);
        
    }

    async findMenu(id:number):Promise<MenuEntity[]>{
        var Menus = await this.menuService.filterMenu(id) ;
        return Menus
    }

    /*Definimos la logica del metodo POST del controlador, es de tipo promise
    para crear un restaurante entity, utilizamos una interfaz para manejar la entrada de 
    datos y para el caso del address y location que son dos entities 

    */
    async createRestaurant (data: {
        name: string,
        address: {
            street:string,
            number:string,
            cityId:number,
            location:{
                lat: number,
                lng: number,
            }
        },
        imageUrl: string
    }):Promise <RestaurantEntity>{
        
        const newLocation = this.locationRepository.create({
            lat: data.address.location.lat.toString(),
            lng: data.address.location.lng.toString(),
        });
        //guarda en el repositorio de location
        const savedLocation = await this.locationRepository.save(newLocation);
        
        const newAddress = this.addressRepository.create({
            ...data.address,
            location: savedLocation
        });
        //guarda en el repositorio de address 
        const savedAddress = await this.addressRepository.save(newAddress);

        const newRestaurant = this.restaurantRepository.create({
            name: data.name,
            imageUrl: data.imageUrl,
            address: savedAddress,
        });
        //guardamos toda la instancia en el repositorio de restaurante
        return await this.restaurantRepository.save(newRestaurant);
    }
    
    //Ordenamos los restaurantes en la paginacion por nombre descendente
    async paginate(options: IPaginationOptions): Promise<Pagination<RestaurantEntity>>{
        const queryBuilder = this.restaurantRepository.createQueryBuilder('r');
        queryBuilder.orderBy('r.name','DESC');
        return paginate<RestaurantEntity>(this.restaurantRepository,options);
    }

}
