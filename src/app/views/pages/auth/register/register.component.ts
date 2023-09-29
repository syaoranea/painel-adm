import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/users/usuario.service';
import { SignupUserRequest } from 'src/app/models/interface/signupUserRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.FormBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private FormBuilder: FormBuilder,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
  }

  onRegister(e: Event) {
    this.onSignup()
    /* e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/']);
    } */
  }

  onSignup() {
   if (this.registerForm.valid && this.registerForm.value) {
     this.usuarioService.signUp(this.registerForm.value as SignupUserRequest)
     .subscribe({
        next: (response) => {
          if (response) {
            alert('Usuario creado correctamente');
            this.router.navigate(['/auth']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
     }
   }



}
