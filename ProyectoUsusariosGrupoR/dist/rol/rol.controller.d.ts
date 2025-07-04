import { RolService } from './rol.service';
import { RolEntity } from 'src/entities/rol.entity';
import { PermissionEntity } from 'src/entities/permision.entity';
interface RequestWithRol extends Request {
    rol: RolEntity;
}
interface Intpermision {
    id: number;
}
export declare class RolController {
    private readonly service;
    constructor(service: RolService);
    create(request: RequestWithRol): Promise<RolEntity>;
    addPermision(id: number, Permission: Intpermision): Promise<RolEntity>;
    findAll(): Promise<RolEntity[]>;
    findOne(id: number): Promise<RolEntity | null>;
    findPermissions(id: number): Promise<PermissionEntity[]>;
    update(id: number, rol: RolEntity): Promise<RolEntity>;
    updatepartial(id: number, rol: Partial<RolEntity>): Promise<RolEntity>;
    delete(id: number): Promise<void>;
}
export {};
