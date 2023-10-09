import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FotoService } from 'src/app/services/fotos/foto.service';
import { UsuarioService } from 'src/app/services/users/usuario.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit, OnDestroy {

  usersList: any[] = [];
  private destroy$ = new Subject<void>();
  public isAsideNavCollapsed = true;

  constructor(
    private fotoService: FotoService,
  ) { }

  ngOnInit(): void {
    this.getFotos();
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
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
