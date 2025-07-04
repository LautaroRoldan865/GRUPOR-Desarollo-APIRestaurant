import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Permissions } from './decorators/permissions.decorator';
import { AxiosService } from 'src/axios/axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector:Reflector, // esto nos ayuda a traer los metadatos que estan en los decoradores
    private serviceAxios: AxiosService // Esto nos ayuda a traer los permisos del usuario
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const request = context.switchToHttp().getRequest(); //Toma el request de la solicitud 
      const token = request.headers.authorization.replace('Bearer ',''); // Guarda el token
      if (token == null) {
        throw new Error('El token no existe'); //valida Existencia del token
      }
      //AGREGAR LOGICA PARA USAR LOS PERMISOS QUE VIENEN EN EL DECORADOR
      
      //Guarda los permisos necesarios para poder realizar una determinada accion o conocer una determinada informacion      
      const permisosRequeridos :string = this.reflector.get<string>(Permissions, context.getHandler()); 

      //Trae los permisos que tiene ese usuario
      const tienePermiso = await this.serviceAxios.getData(token,permisosRequeridos)

      //Valida si tiene el permiso para el metodo especificado en la solicitud
      if (!tienePermiso) {
        throw new Error('No tienes permisos suficientes');
      }

      return true;
    } catch (error) {
      //devuelve el error que no tiene permisos 
      throw new UnauthorizedException(error?.message);
    }
  }
}
