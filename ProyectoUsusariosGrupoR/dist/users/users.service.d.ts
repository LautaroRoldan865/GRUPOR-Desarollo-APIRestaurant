import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { PermissionEntity } from 'src/entities/permision.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { RolService } from 'src/rol/rol.service';
export declare class UsersService {
    private jwtService;
    private readonly RolService;
    repository: typeof UserEntity;
    constructor(jwtService: JwtService, RolService: RolService);
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserI, permision: string): boolean;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserEntity>;
    findPermissions(id: number): Promise<PermissionEntity[]>;
    assignRol(idUser: number, idRol: number): Promise<void>;
}
