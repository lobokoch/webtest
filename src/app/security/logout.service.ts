import { AuthService } from './auth.service';
import { HttpClientWithToken } from './http-client-token';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = environment.apiUrl + '/tokens/revoke';

  constructor(
    private http: HttpClientWithToken,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.cleanAccessToken();
      });
  }

}
