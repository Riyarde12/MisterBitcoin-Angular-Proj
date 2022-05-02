import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    const isLoggedIn = this.userService.isAuthenticated()
    console.log('isLoggedIn', isLoggedIn);
    // if (!isLoggedIn) this.router.navigateByUrl('/login')
    // else return isLoggedIn
    // if (isLoggedIn)  
    return isLoggedIn
  }

}
