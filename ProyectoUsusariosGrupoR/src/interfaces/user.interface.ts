import { RolEntity } from "src/entities/rol.entity";

export interface UserI {
  email: string;
  password: string;
  rol: RolEntity;
}
