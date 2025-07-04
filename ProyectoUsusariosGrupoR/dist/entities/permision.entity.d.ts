import { BaseEntity } from 'typeorm';
import { RolEntity } from './rol.entity';
export declare class PermissionEntity extends BaseEntity {
    id: number;
    nombre: string;
    descripcion: string;
    rol: RolEntity[];
}
