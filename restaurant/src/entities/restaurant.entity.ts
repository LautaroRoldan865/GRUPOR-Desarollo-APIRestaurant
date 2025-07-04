import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne,JoinColumn,OneToMany } from 'typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { MenuEntity } from 'src/entities/menu.entity';

@Entity()
export class RestaurantEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    //Un restaurante se relaciona con muchos menus
    @OneToMany(()=>MenuEntity,(menu)=>menu.restaurant)
    @JoinColumn()
    menu:MenuEntity[]

    //Un restaurante se asocia a una unica direccion
    @OneToOne(()=>AddressEntity,(address)=>address.restaurant)
    @JoinColumn()
    address: AddressEntity

    @Column()
    imageUrl: string
}

