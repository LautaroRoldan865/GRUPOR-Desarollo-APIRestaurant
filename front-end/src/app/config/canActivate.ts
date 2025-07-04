import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const canActivateFn: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const isToken = localStorage.getItem('accessToken');
    if (isToken) {
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
};