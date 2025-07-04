import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';
import { RestaurantEntity } from 'src/entities/restaurant.entity';
@Entity()
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    price:number

    @Column()
    imageUrl:string
    //Muchos menus pueden ser de un unico restaurante
    @ManyToOne(()=> RestaurantEntity, (restaurant)=>restaurant.menu)
    @JoinColumn({name:'restaurantId'})
    restaurant :RestaurantEntity
}
