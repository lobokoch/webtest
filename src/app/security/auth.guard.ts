import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
  private auth: AuthService,
  private router: Router
) {

}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAccessTokenInvalid()) {
      console.log('AuthGuard:' + 'AcessToken inválido, obtendo novo...');

      return this.auth.refreshAccessToken()
      .then(() => {
        if (this.auth.isAccessTokenInvalid()) {
          this.router.navigate(['/login']);
          return false;
        } // if

        return true;
      });
    } // if

    return true;
  }
}

