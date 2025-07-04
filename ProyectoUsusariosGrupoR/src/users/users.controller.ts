import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';
import {Permissions} from '../middlewares/decorators/permissions.decorator'
import { PermisosDTO } from 'src/interfaces/permisos.dto';

@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  //Devolver el email del usuario autenticado
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return {
      email: req.user.email,
    };
  }

  //Definimos el login para un determinado usuario, validandolo con el ingreso de correo y contraseña
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  //Definimos el registro de un nuevo usuario para ello debemos ingresar el correo y la contraseña
  //El RegisterDTO Especifica el formato de ingreso de los datos
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  //Definimos si un usuario tiene un determinado permiso
  @UseGuards(AuthGuard)
  @Get('can-do/:permission')
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    return this.service.canDo(request.user, permission);
  }

  //Generamos un refresh token
  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }
  
  //Asignamos un rol determinado para un usuario
  @UseGuards(AuthGuard)
  @Permissions(['assign_rol']) 
  @Post('asignar-rol')
    async assignRol(@Req()request: Request,@Body() Body: PermisosDTO){ 
        return this.service.assignRol(Body.idUser,Body.idRol)
    }
}
