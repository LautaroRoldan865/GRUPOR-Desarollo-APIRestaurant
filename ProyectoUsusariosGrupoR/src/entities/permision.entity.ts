import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { RolEntity } from './rol.entity';


@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})

  @Column()
  nombre: string;
  
  @Column()
  descripcion: string;

  @ManyToMany(()=> RolEntity, (rol)=>rol.permission)
  rol: RolEntity[];
 
}