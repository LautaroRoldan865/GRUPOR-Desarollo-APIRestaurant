import {
  HttpException,
  Injectable,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { PermissionEntity } from 'src/entities/permision.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import { RolService } from 'src/rol/rol.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  repository = UserEntity;
  
  constructor(private jwtService: JwtService,private readonly RolService: RolService) {}

  //metodo que genera un nuevo token
  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  //Logica que permite validar si un usuario tiene un determinado permiso por medio de su rol
  canDo(user: UserI, permision: string): boolean {
    const result = user.rol.permission.some((permission)=> permission.nombre = (permision))
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  //Logica que permite Registrar un nuevo Usuario validando los datos ingresaddos por el usuario con los dto
  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10);
      await this.repository.save(user);
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('Error de creacion', 500);
    }
  }

  // Logica que permite validar el ingreso de un determinado usuario
  // Devue    
  
  async login(body: LoginDTO){
  const user = await this.findByEmail(body.email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken(
        { email: user.email },
        'refresh',
      )
    };
  }

  //Logica para buscar a un usuario por su email
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where:{email},relations:{rol:{permission:true}} });
  }

  //Logica para buscar permisos de un rol
  async findPermissions(id:number):Promise<PermissionEntity[]>{
    var Service = await this.RolService.findPermissions(id) ;
    return Service
  }

  //Logica para asignar rol a un usuario
  async assignRol(idUser:number,idRol:number): Promise<void>{
    let id = idUser;
    let user = await this.repository.findOneBy({id});
    let rol = await this.RolService.findOne(idRol);
    if(!user){
      throw new NotFoundException(`user not exist with the id: ${idUser}`);
    }else if (!rol){
      throw new NotFoundException(`rol not exist with the id: ${idUser}`);
    }
    
    user.rol = rol;
    await this.repository.save(user); 
        
  }
  
}
