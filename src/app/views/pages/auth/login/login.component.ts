import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from 'src/app/services/users/usuario.service';

import { AuthRequest } from 'src/app/models/interface/authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loginform: FormGroup;
  loginForm = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    this.onLogin();
    /* e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    } */
  }

  onLogin() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.usuarioService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.error = false;
            this.cookieService.set('token', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.log(err);
          this.error = true;
        }
      });
    }
  }

}
