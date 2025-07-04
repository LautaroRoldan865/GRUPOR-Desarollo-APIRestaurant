import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { config } from '../../config/env';
import { AxiosService } from '../../axios/axiosService';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css'
})
export class CrearUsuario {
  email: string = '';
  password: string = '';
  password2: string = '';

  constructor(private router:Router, private serviceAxios: AxiosService){}

  async crearUsuario(){
    this.serviceAxios.crearUsuario(this.password,this.password2,this.email)
  }  
  
  async login(){
    this.router.navigate(['/login']);
  }
}
