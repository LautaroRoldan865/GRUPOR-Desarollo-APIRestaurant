import { UserI } from '../interfaces/user.interface';
import { BaseEntity } from 'typeorm';
import { RolEntity } from './rol.entity';
export declare class UserEntity extends BaseEntity implements UserI {
    id: number;
    email: string;
    password: string;
    rol: RolEntity;
}
