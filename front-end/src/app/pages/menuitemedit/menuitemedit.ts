import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component'; 
import { editService } from '../../config/editService';
import { AxiosService } from '../../axios/axiosService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menuitemedit',
  imports: [CommonModule,FormsModule],
  templateUrl: './menuitemedit.html',
  styleUrl: './menuitemedit.css'
})

export class Menuitemedit implements OnInit{
  constructor(private editService: editService, private axiosService: AxiosService, private serviceRouter: Router){}
  item: { id: number, name: string; description: string; price : number; imageUrl: string; editing: boolean} = {id: 0, name: "", description: "", price : 0, imageUrl: "", editing: false };
  
  
  ngOnInit(): void {
    this.initialization();
  }

  async initialization() {
    const id = JSON.parse(localStorage.getItem('Seleccion') || '{}');
    
    if (id) {
      const resultado = await this.axiosService.buscarMenu({ id });
      if (resultado) {
        this.item = resultado;
      } else {
        alert('No se pudo cargar el menú');
      }
    } else {
      alert('No se encontró un ID válido en localStorage');
    }
  }

  async editar(){
    this.axiosService.editarMenu(this.item)
  }

  async Cancelar(){
    this.serviceRouter.navigate(['/home']);
  }

  toggleEdit(item: any) {
    item.editing = !item.editing;
  }

}