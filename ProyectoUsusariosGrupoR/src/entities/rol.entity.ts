import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permision.entity';


@Entity('roles')
export class RolEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Index({unique:true})
    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(()=> UserEntity, (user)=>user.rol)
    User: UserEntity[];

    //Crea una tabla intermedia por que un rol puede tener muchos permisos y un permiso estar en muchos roles
    @ManyToMany(()=> PermissionEntity, (permission)=> permission.rol)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'idRol',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'idPermission',
            referencedColumnName: 'id',
        },
    })
    permission: PermissionEntity[];
}