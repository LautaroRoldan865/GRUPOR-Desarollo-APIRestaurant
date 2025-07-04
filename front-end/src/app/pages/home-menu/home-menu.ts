import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { GlobalStatusService } from '../../services/global-status.service';
import { Router } from '@angular/router';
import { editService } from '../../config/editService';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AxiosService } from '../../axios/axiosService';

interface itemDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface RestaurantDTO{
  name: string;
  imageUrl: string;
}


@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home-menu.html',
  styleUrls: ['./home-menu.css'],
  providers: [editService]  
})
export class HomeMenu implements OnInit {
  items: itemDTO[] = [];
  restaurant: RestaurantDTO = {name:"",imageUrl:""};
  pagina: number = 1

  constructor(
    private readonly apiService: ApiService,
    private readonly axiosService: AxiosService,
    private readonly globalStatusService: GlobalStatusService,
    private router: Router,
    private editService: editService
  ) {}

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    const restaurante= await this.axiosService.buscarRestaurante({id:1});
    this.restaurant= restaurante;
    const data = await this.clickPagina(this.pagina);
    this.items = data;
    this.globalStatusService.setLoading(false);
  }

  

  async Editar(item: itemDTO) {
    //this.editService.setItem(item);
    localStorage.setItem('Seleccion', JSON.stringify(item.id));
    this.router.navigate(['/menuitemedit']);
  }

  async eliminarItem(item: itemDTO):Promise<void>{
     Swal.fire({
      title: "¿Está seguro?",
      text: "No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
        title: 'swal2-title-custom',
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel'
    },
    buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.axiosService.eliminaritem(item.id);
      }
    });
  }

  async mostrarItem(item: itemDTO){
    Swal.fire({
      title: item.name,
      html: `<strong>Descripción:</strong> ${item.description}<br><strong>Precio:</strong> $${item.price.toFixed(2)}`,
      imageUrl: item.imageUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      customClass: {
            popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
            title: 'swal2-title-custom',
            confirmButton: 'btn-confirm'}
    });
  }

  async pasarPagina(pag: number): Promise<void>{
    const newPag = this.pagina + pag
    if (newPag <= 3 && newPag >= 1){
      this.cargarPagina(newPag) 
    }  
  }

  async mostrarRestaurante(){
    Swal.fire({
      title: this.restaurant.name,
      imageUrl: this.restaurant.imageUrl,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      customClass: {
            popup: 'swal2-shadow swal2-border-radius', // clases CSS para popup
            title: 'swal2-title-custom',
            confirmButton: 'btn-confirm'}
    });
  }

  async cargarPagina(pagina: number): Promise<void> {
    const data = await this.clickPagina(pagina);
    this.items = data;
  }

  async clickPagina(pagina: number): Promise<itemDTO[]> {
    this.pagina = pagina;
    const data = await this.apiService.getData();

    const cantidadPaginas = 3;
    const cantidadElementos = data.length;
    const cantidadPorPagina = Math.ceil(cantidadElementos / cantidadPaginas);

    const puntoPartida = cantidadPorPagina * (pagina - 1);
    const puntoCorte = cantidadPorPagina * pagina;

    return data.slice(puntoPartida, puntoCorte);
  }

}


