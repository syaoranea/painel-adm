import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataTable } from 'simple-datatables';
import { UsuarioService } from 'src/app/services/users/usuario.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit, OnDestroy {

  usersList: any[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    //criar settimout para carregar a tabela
    setTimeout(() => {
      const dataTable = new DataTable("#dataTableExample");
    }, 1000);
  }
  getUsers(): void {
    this.usuarioService.getAllUsers()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        this.usersList = response;
        this.usuarioService.setUserDatas(this.usersList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
