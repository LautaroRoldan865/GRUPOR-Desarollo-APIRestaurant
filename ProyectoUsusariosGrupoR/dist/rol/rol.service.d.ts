import { PermissionEntity } from 'src/entities/permision.entity';
import { RolEntity } from 'src/entities/rol.entity';
import { PermissionService } from 'src/permission/permission.service';
import { Repository } from 'typeorm';
export declare class RolService {
    private RolRepo;
    private PermissionService;
    constructor(RolRepo: Repository<RolEntity>, PermissionService: PermissionService);
    create(Rol: Partial<RolEntity>): Promise<RolEntity>;
    findAll(): Promise<RolEntity[]>;
    findOne(id: number): Promise<RolEntity | null>;
    update(id: number, rol: RolEntity): Promise<RolEntity | null>;
    findPermissions(id: number): Promise<PermissionEntity[]>;
    addPermision(id: number, idPermission: number): Promise<RolEntity>;
    updatePartion(id: number, rol: Partial<RolEntity>): Promise<RolEntity>;
    delete(id: number): Promise<void>;
}
