import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permision.entity';
export declare class RolEntity extends BaseEntity {
    id: number;
    nombre: string;
    descripcion: string;
    User: UserEntity[];
    permission: PermissionEntity[];
}
