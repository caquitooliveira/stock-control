import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignUperRequest } from "src/app/models/interfaces/user/signUperRequest";
import { SignUperResponse } from "src/app/models/interfaces/user/singUperResponse";
import { AuthResponse } from "src/app/models/interfaces/user/auth/AuthResponse";
import { AuthRequest } from "src/app/models/interfaces/user/auth/AuthRequest";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: "root",
})
export class UserService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  signupUser(requestDatas: SignUperRequest): Observable<SignUperResponse> {
    return this.http.post<SignUperResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`,
      requestDatas
    );
  }

  isLoggedIn(): boolean {
    // Verificar se o usuário possui um token ou cookie
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

}
