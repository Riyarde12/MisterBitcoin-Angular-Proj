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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = this.userService.isAuthenticated()
    console.log('isLoggedIn', isLoggedIn);
    // if (isLoggedIn) this.router.navigateByUrl('/login')
    if (!isLoggedIn) {
      this.router.navigate(['login'])
      return isLoggedIn
    }

    else return isLoggedIn

  }

}
