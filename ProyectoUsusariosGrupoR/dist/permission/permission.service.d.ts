import { PermissionEntity } from 'src/entities/permision.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private PersmissionRepo;
    constructor(PersmissionRepo: Repository<PermissionEntity>);
    createPermission(permission: Partial<PermissionEntity>): Promise<PermissionEntity>;
    findAll(): Promise<PermissionEntity[]>;
    findOne(id: number): Promise<PermissionEntity | null>;
    update(id: number, permission: PermissionEntity): Promise<PermissionEntity>;
    filterService(id: number): Promise<PermissionEntity[]>;
    updatePartion(id: number, permission: Partial<PermissionEntity>): Promise<PermissionEntity>;
    delete(id: number): Promise<void>;
}
