import { Photo } from './../interface/photos.interface';
import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataTable } from 'simple-datatables';
import { FotoService } from 'src/app/services/fotos/foto.service';

@Component({
  selector: 'app-list-fotos',
  templateUrl: './list-fotos.component.html',
  styleUrls: ['./list-fotos.component.scss']
})
export class ListFotosComponent implements OnInit, OnDestroy {

  usersList: any[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private fotoService: FotoService,
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
      this.getFotos();
    //}
  }

  getFotos(): void {
    this.fotoService.getAllFotos()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        this.usersList = response;
        this.fotoService.setUserDatas(this.usersList);
      },
      error: (err) => {
        console.log(err);
        this.route.navigate(['/dashboard']);
      }
    });
  }

  onEdit(id: string) {
    this.route.navigate(['/apps/fotos/criar-img',  { id: id }]);
    console.log(id + ' list');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(id: string) {
    this.fotoService.deleteFotos(id)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.getFotos();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
