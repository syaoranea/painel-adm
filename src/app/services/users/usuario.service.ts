import { SignupUserResponse } from './../../models/interface/signupUserResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interface/authRequest';
import { AuthResponse } from 'src/app/models/interface/authResponse';
import { SignupUserRequest } from 'src/app/models/interface/signupUserRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiurl = environment.apiUrl;

constructor(private http: HttpClient) { }

signUp(request: SignupUserRequest): Observable<SignupUserResponse> {
  return this.http.post<SignupUserResponse>(
    `${this.apiurl}/users`,
    request
  );
}

authUser(request: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${this.apiurl}/auth`,
    request
  );
}

}
