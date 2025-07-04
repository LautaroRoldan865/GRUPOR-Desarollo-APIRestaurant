import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn } from "typeorm";
import { AddressEntity } from "src/entities/address.entity"; 
import { BaseEntity } from "typeorm";

@Entity()
export class LocationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    idLocation : number;

    @Column()
    lat:string;
    
    @Column()
    lng:string;

    //Una direccion se asocia con una unica ubicacion geografica
    @OneToOne(()=>AddressEntity,(address)=>address.location)
    @JoinColumn()
    address: AddressEntity
}