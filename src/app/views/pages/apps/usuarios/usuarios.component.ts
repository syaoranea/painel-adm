import { Component, OnInit } from '@angular/core';
import { SignupUserRequest } from 'src/app/models/interface/signupUserRequest';
import { UsuarioService } from 'src/app/services/users/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public isAsideNavCollapsed = true;
  constructor(

  ) { }

  ngOnInit(): void {

  }



}
