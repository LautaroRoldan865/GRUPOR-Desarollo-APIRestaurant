import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn  } from "typeorm";
import { RestaurantEntity } from "./restaurant.entity";
import { LocationEntity } from "./location.entity";
import { BaseEntity } from "typeorm";

@Entity()
export class AddressEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    cityId: number;

    @OneToOne(()=> LocationEntity, (location)=> location.address)
    @JoinColumn()
    location : LocationEntity

    //Una direccion se asocia a un unico restaurante
    @OneToOne(()=> RestaurantEntity, (restaurant)=>restaurant.address)
    @JoinColumn()
    restaurant:RestaurantEntity

}
