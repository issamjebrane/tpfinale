import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { UsersService } from '../services/users.service';



export const onlyLoggedInUsersGuardGuard: CanActivateFn = (route, state) => {
  if(inject(UsersService).isLoggedIn()){
    return true
  }else{
    alert('please connect to your login to access admin')
    inject(Router).navigate(['login'])
    return false
  }
};
