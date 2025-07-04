import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { Menuitemedit } from './pages/menuitemedit/menuitemedit';
import {CrearUsuario} from './pages/crear-usuario/crear-usuario';
import { Crearmenu } from './pages/crearmenu/crearmenu';
import { HomeMenu } from './pages/home-menu/home-menu';
import { canActivateFn } from './config/canActivate';

export const routes: Routes = [
  {
    path: 'home',
    component: TemplateComponent,
    children: [
      { path: '', component:HomeMenu }
    ],
  },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: CrearUsuario, canActivate: [canActivateFn]},
    { path: 'menuitemedit',component: Menuitemedit, canActivate: [canActivateFn]},
    { path: 'crearmenu', component: Crearmenu, canActivate: [canActivateFn]} 
  
];

