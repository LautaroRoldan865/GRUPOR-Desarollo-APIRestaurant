import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';
import { RequestWithUser } from 'src/interfaces/request-user';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { Permissions } from './decorators/permissions.decorator';
import { PermissionEntity } from 'src/entities/permision.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector:Reflector //trae metadatos de los decoradores
  ) {}
  //
  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const request: RequestWithUser = context.switchToHttp().getRequest();//Toma request  solicitud
      const token = request.headers.authorization.replace('Bearer ','');//Guarda token
      if (token == null) {
        throw new Error('El token no existe');//Valida existencia token
      }
      //Extraedel token los datos como email y rol almacenados en el token
      const payload = this.jwtService.getPayload(token);
      const user = await this.usersService.findByEmail(payload.email);
      request.user = user;
      console.log(user)
      
      //AGREGAR LOGICA PARA USAR LOS PERMISOS QUE VIENEN EN EL DECORADOR
      
      //Guarda los permisos necesarios para que un usuario realize una accion
      const permisosRequeridos :string[] = this.reflector.get<string[]>(Permissions, context.getHandler()) || [];

      //guarda los permisos del usuario
      const permisosUsuario = user?.rol?.permission || [];

      console.log(permisosUsuario)
      //valida si dentro de los permisos del usuario esta el permiso requeri
      const tienePermiso = permisosRequeridos.every((p) => permisosUsuario.some(pu => pu.nombre === p));

      if (!tienePermiso) {
        throw new Error('No tienes permisos suficientes');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message);
    }
  }
}
