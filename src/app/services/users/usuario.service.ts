import { CookieService } from 'ngx-cookie-service';
import { SignupUserResponse } from './../../models/interface/signupUserResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthRequest } from 'src/app/models/interface/authRequest';
import { AuthResponse } from 'src/app/models/interface/authResponse';
import { SignupUserRequest } from 'src/app/models/interface/signupUserRequest';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/interface/product';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiurl = environment.apiUrl;
  private token = this.cookieService.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${this.token}`,
    }),
  };
  private userDataEmitter$ =
  new BehaviorSubject<Array<Product> | null>(null);
  userData: Array<Product> = [];

constructor(
  private http: HttpClient,
  private cookieService: CookieService
  ) { }

signUp(request: SignupUserRequest): Observable<SignupUserResponse> {
  return this.http.post<SignupUserResponse>(
    `${this.apiurl}/user`,
    request
  );
}

  authUser(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiurl}/auth`,
      request
    );
  }

  isLogged(): boolean {
    const JWT_TOKEN = this.cookieService.get('token');
    return JWT_TOKEN ? true : false;
  }

  getAllUsers(): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      `${this.apiurl}/products`,
      this.httpOptions
    );
  }

  setUserDatas(data: Array<Product>): void {
    if (data) {
      this.userDataEmitter$.next(data);
      this.getUsersDatas();
    }

  }
  getUsersDatas() {
    this.userDataEmitter$.pipe(take(3)).subscribe({
      next: (response) => {
        if (response){
           this.userData = response;
        }
      },
    });
    return this.userData;
  }

  editUser(requestData: Product): Observable<void> {
    return this.http.put<void>(
      `${this.apiurl}/product/edit`,
      requestData,
      this.httpOptions
    );
  }

  deleteUser(id: string): Observable<Product> {
    return this.http.delete<Product>(
      `${this.apiurl}/product/delete`,
      {
      ...this.httpOptions,
      params: {
        product_id: id,
      }
    }
    );
  }

}
