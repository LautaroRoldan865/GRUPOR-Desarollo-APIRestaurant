import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AxiosService } from '../../axios/axiosService';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AxiosService]
})
export class LoginComponent {
  email: string = '';
  password: string = ''; 
  
  constructor(private router: Router, private serviceAxios: AxiosService) {}

  async login(){
    this.serviceAxios.login(this.email,this.password);
  }
  
  async registrar(){
    this.router.navigate(['/registrar']);
  }
}


/*
const token = localStorage.getItem('accessToken');

const response = await axios.get('http://localhost:3000/endpoint', {
  headers: {
    Authorization: `Bearer ${token}`
  }
*/
