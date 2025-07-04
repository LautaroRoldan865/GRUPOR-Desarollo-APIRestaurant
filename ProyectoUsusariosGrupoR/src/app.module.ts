import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolImports } from './rol/rolProviders';
import { PermissionImports } from './permission/permissionProviders';
import { UserImports } from './users/usersProviders';

// conexion con la base de datos de postgres
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5433,
      username:'postgres',
      password: 'postgres',
      database:'users',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...PermissionImports.entities,...RolImports.entities,...UserImports.entities]),
  ],
  controllers: [AppController,UsersController,...RolImports.controllers,...PermissionImports.controller,...UserImports.controller],
  providers: [AuthGuard, JwtService, UsersService, ...RolImports.providers,...PermissionImports.providers,...UserImports.providers],
})
export class AppModule {}
