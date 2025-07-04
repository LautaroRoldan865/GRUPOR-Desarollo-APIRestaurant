import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from './rol.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})

  @Column()
  email: string;

  @Column()
  password: string;

  //Muchos usuario pueden tener un mismo rol
  @ManyToOne(()=> RolEntity)
  @JoinColumn({ name: 'rol', referencedColumnName: 'nombre'})
  rol: RolEntity;
  
}
