import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getDatas();

    //setTimeout(() => {
      const dataTable = new DataTable("#dataTableExample");
    //}, 1000);

  }

  getDatas() {
   /*  const users = this.usuarioService.getUsersDatas();
    if (users.length > 0) {
      this.usersList = users;
    }else { */
      this.getUsers();
    //}
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
        this.route.navigate(['/dashboard']);
      }
    });
  }

  onEdit(id: string) {
    this.route.navigate(['/apps/usuarios/criar',  { id: id }]);
    console.log(id + ' list');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(id: string) {
    this.usuarioService.deleteUser(id)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.getUsers();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
