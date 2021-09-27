import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (localStorage.isLogin !== undefined && localStorage.isLogin.toString() === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
