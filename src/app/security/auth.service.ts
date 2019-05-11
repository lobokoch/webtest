import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  jwtPayload: any;
  tenant: string = null;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.loadToken();
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  refreshAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    // .append('Authorization', 'Basic a2VydWJpbi1mZTpBbmdlbCE4MQ==');
    .append('Authorization', 'Basic a2VydWJpbi1mZToxMjM=');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true /* for CORS */ })
    .toPromise()
    .then(response => {
      console.log('!!! Atualizou access token !!!');
      this.storeToken(response.access_token);
      return Promise.resolve(null);
    })
    .catch(response => {
      console.log('Erro ao renovar token:' + response);
      return Promise.resolve(null); // Não conseguiu, não tem o que fazer, vai ter que fazer login.
    });
  }

  login(username: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    // .append('Authorization', 'Basic a2VydWJpbi1mZTpBbmdlbCE4MQ=='); // Dev da API passa isso.
    .append('Authorization', 'Basic a2VydWJpbi1mZToxMjM='); // Dev da API passa isso.

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response.access_token);
        this.tenant = response.tenant;
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  cleanAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
    } else {
      // this.jwtPayload = null;
    }
  }
  
  public doLoginAnonymous(): Promise<boolean> {
      const username = 'anonymous@kerubin.com.br';
      const password = 'Kerubin_Anonymous@!1';
      return this.login(username, password)
      .then(() => {
        console.log('Anonymous login success!');
        return true;
      })
      .catch (e => {
        console.log('Anonymous login failed: ' + e);
        return false;
      });
 }

}
