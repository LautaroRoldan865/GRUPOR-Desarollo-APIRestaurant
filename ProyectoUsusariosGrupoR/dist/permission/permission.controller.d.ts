import { PermissionEntity } from 'src/entities/permision.entity';
import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly service;
    constructor(service: PermissionService);
    create(request: Request, Permissions: PermissionEntity): Promise<PermissionEntity>;
    findAll(): Promise<PermissionEntity[]>;
    findOne(id: number): Promise<PermissionEntity | null>;
    update(id: number, permiso: PermissionEntity): Promise<PermissionEntity>;
    updatepartial(id: number, permiso: Partial<PermissionEntity>): Promise<PermissionEntity>;
    delete(id: number): Promise<void>;
}
