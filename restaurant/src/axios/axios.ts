import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService{
    //funcion para obtener el token y permiso de una solicitud
    async getData(token:string,permission:string) {
    try {

        //verifica si el usuario tiene el permiso
        const response = await axios.get(`http://localhost:3001/user/can-do/${permission}`, {
            //autenticar un usuario
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        return true
    } catch (error) {
        throw new UnauthorizedException(error)
    }
    }
}