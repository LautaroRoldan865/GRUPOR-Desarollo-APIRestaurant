import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { config } from '../../config/env';
import { FormsModule } from '@angular/forms';
import { AxiosService } from '../../axios/axiosService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearmenu',
  imports: [FormsModule],
  templateUrl: './crearmenu.component.html',
  styleUrls: ['./crearmenu.component.css']
})
export class Crearmenu {
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';

  constructor (private serviceAxios: AxiosService, private router: Router){}

  async registrarMenu(){
    this.serviceAxios.registrarMenu(this.name,this.description,this.price,this.imageUrl);
  }
  
  async home(){
    this.router.navigate(['/home']);
  }
}

/*
const token = localStorage.getItem('accessToken');

const response = await axios.get('http://localhost:3000/endpoint', {
  headers: {
    Authorization: `Bearer ${token}`
  }
*/