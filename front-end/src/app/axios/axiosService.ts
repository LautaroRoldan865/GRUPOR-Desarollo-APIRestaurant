import { Router } from '@angular/router';
import axios, { Axios } from 'axios';
import { config } from '../config/env';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


interface itemDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  editing: boolean;
}

interface RestaurantDTO{
  name: string;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AxiosService{
    //Inyectar automáticamente el token de acceso en cada solicitud.
    axiosClient:Axios;
    constructor (private serviceRouter: Router){
        this.axiosClient=axios.create()
        this.axiosClient.interceptors.request.use(  (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
            config.headers.Authorization = token;
            }
        return config;},(error) => {return Promise.reject(error);});
    }

    
    //Logica para registrar un menu por medio de la conexion con la api
    async registrarMenu(name: string, description: string,price: number,imageUrl: string){
        try{
        //El response almacena la respuesta de la api como resultado de hacer un post a la api de restaurant     
        const response = await this.axiosClient.post(config.urls.menu, {
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            restaurantId: 1
        });
        //Interfaz que ve el usuario 
          Swal.fire({
                title: "Creado!",
                text: "El menú ha sido registrado correctamente.",
                icon: "success",
                customClass: {
                  popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                  title: 'swal2-title-custom',
                  confirmButton: 'btn-confirm'}
              }).then((result) => {
                if (result.isConfirmed) {
                  this.serviceRouter.navigate(['/home']);
                }
              });
        }catch(error: any){
          console.error('Error completo:', error);
          Swal.fire({
                    title: "Error!",
                    text: "El menú no pudo ser registrado correctamente.",
                    icon: "error",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
          });
          //alert('Error: ' + (error.message || JSON.stringify(error)));
        }
    }
  
    //Logica para que un usuario se loguee, para ello pasamos el email y la password para autenticarlo
    async login(email: string, password: string) {
      try {
          //Almacena la respuesta de la api como resultado de haber hecho un post a la api de user
          const response = await this.axiosClient.post(config.urls.login, {
              email: email,
              password: password,
          });
          //Guarda el accessToken
          const accessToken = response.data.accessToken;

          if (accessToken) {
              //Si existe el accessToken lo almacena en el localstorage bajo el nombre de accessToken
              localStorage.setItem('accessToken', accessToken);
              this.serviceRouter.navigate(['/home']);
          } else {
              //Si no existe o no se genero, devuelve un error
              alert('Login fallido: no se recibió token');
          }

      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales incorrectas o error del servidor');
      }
    }
    //Logica para crer un suario desde el login, verifica las contrasenas
    async crearUsuario(password: string, password2: string, email: string){
      try{
        if(password == password2){

          const response = await this.axiosClient.post(config.urls.create_user,{
            email: email,
            password: password,
          });
          //Interfaz que devuelve al finalizar la creacion del usuario
          Swal.fire({
              title: "Cuenta creada con éxito!",
              text: "¡Bienvenido a la Panchoneta!",
              icon: "success",
              customClass: {
                popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                title: 'swal2-title-custom',
                confirmButton: 'btn-confirm'}
            }).then((result) => {
                if (result.isConfirmed) {
                  this.serviceRouter.navigate(['/login']);
                }
            });
        }else{
          //alert('las Contraseñas no coinciden')
          Swal.fire({
                    title: "Error!",
                    text: "Las contraseñas no coinciden.",
                    icon: "error",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
          });

        }
      }catch (error){
        console.error('Error al crearUsuario:', error);
        Swal.fire({
                    title: "Error!",
                    text: "Tu cuenta no pudo ser creada.",
                    icon: "error",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
          });
        //alert('error de crear usuario')
      }
    }

    //Logica para buscar menu si ese cliente tiene permisos va y busca los menus por id 
    async buscarMenu({ id }: { id: number}): Promise<itemDTO | null> {
      try{
        //se realiza  un get a la api de menu para traer el respectivo menu 
          const response = (await this.axiosClient.get(`${config.urls.menu}/${id}`));
          const Element : itemDTO = response.data
          return Element;
      }catch (error){
          console.error('Error al BuscarMenu:', error);
          alert('error de BuscarMenu');
          return null;
      }
    }

    //Logica para editar un menu mediante el ingreso de los datos o modificaciones para un menu guardado
    async editarMenu( item: itemDTO ){
      try{
          //Almacena el resultado de hacer un patch a la api de menu, identificando al menu por medio de su 
          const response = (await this.axiosClient.patch(`${config.urls.menu}/${item.id}`,{
              name: item.name,
              description: item.description,
              price: item.price,
              imageUrl: item.imageUrl
          }));
          //Si la operacion se ejecuta con exito se devuelve un mensaje por pantalla
          if(response){
              Swal.fire({
                title: "Editado con éxito!",
                text: "El item ha sido editado correctamente.",
                icon: "success",
                customClass: {
                  popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                  title: 'swal2-title-custom',
                  confirmButton: 'btn-confirm'}
              }).then((result) => {
                  if (result.isConfirmed) {
                    this.serviceRouter.navigate(['/home']);
                  }
              });
          }else{
            alert('error de BuscarMenu')
          }
      }catch (error){
          console.error('Error al BuscarMenu:', error);
          Swal.fire({
                    title: "Error!",
                    text: "El menú no pudo ser editado.",
                    icon: "error",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
          });
          //alert('error de BuscarMenu')
      }
    }

    //Logica para eliminar un item, verifica si esa instancia de cliente tiene el permiso
    
    async eliminaritem(id: number){
      try{
        //Hace un delete a la api de menu
        const response = (await this.axiosClient.delete(`${config.urls.menu}/${id}`))
        if (response){
          //Mensaje de exito
          Swal.fire({
                    title: "Eliminado!",
                    text: "El item ha sido eliminado correctamente.",
                    icon: "success",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
                  }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                  });
          this.serviceRouter.navigate(['/home']);
        }else{
          alert('error de EliminarMenu');
        }
      }catch (error){
        console.error('Error al EliminarMenu:', error);
        Swal.fire({
                    title: "Error!",
                    text: "El item no pudo ser eliminado correctamente.",
                    icon: "error",
                    customClass: {
                      popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
                      title: 'swal2-title-custom',
                      confirmButton: 'btn-confirm'}
          });
      
      }

    }

    //Logica para buscar un restaurante por medio de su id
    async buscarRestaurante({ id }: { id: number }): Promise<RestaurantDTO> {
      try{
        //Almacena el resultado de hacer un get a la api de restaaurant que contiene los menus
        const response = (await this.axiosClient.get(`${config.urls.restaurant}/${id}`))
        //Le damos el formato a la informacion
        const Element : RestaurantDTO = response.data
        console.log(Element)
        return Element;
      }catch (error){
          console.error('Error al BuscarRestaurante:', error);
          alert('error de BuscarRestaurante')
          const Element: RestaurantDTO = {name:"",imageUrl:""}
          return Element;
      }
    } 

}


