import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LogoutService } from './logout.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    })
  ],
  declarations: [],
  providers: [
    AuthGuard,
    LogoutService
  ]
})

export class SecurityModule { 

}
