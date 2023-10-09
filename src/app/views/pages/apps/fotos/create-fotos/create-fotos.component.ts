import { Photo } from './../interface/photos.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FotoService } from 'src/app/services/fotos/foto.service';
@Component({
  selector: 'app-create-fotos',
  templateUrl: './create-fotos.component.html',
  styleUrls: ['./create-fotos.component.scss']
})
export class CreateFotosComponent implements OnInit, OnDestroy {

  formFotos: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    description: ['', Validators.required],
    imageurl: ['', Validators.required],
    thumbnailurl: ['', Validators.required],
    datacriacao: ['', Validators.required],
    users: ['', Validators.required]
  });

  formEditFoto: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nome: ['', Validators.required],
    description: ['', Validators.required],
    imageurl: ['', Validators.required],
    thumbnailurl: ['', Validators.required],
    datacriacao: ['', Validators.required],
    users: ['', Validators.required]
  });

  id:string | null;
  allFotos: Photo[] = [];
  loading = false;

  private destroy$ = new Subject<void>();
  constructor(
    private fotoService: FotoService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.initForm();
    if (this.id) {
      this.getProductSelectedDatas(this.id);
    }else{
      this.loading = true;
    }
  }

  initForm() {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id + 'edit'); // Esto imprimirá "Hola desde ComponenteA"
    });
  }

  onSubmit() {
    if (this.formFotos.value && this.formFotos.valid) {
      this.fotoService.createFotos(this.formFotos.value as Photo)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.route.navigate(['/apps/fotos/listar-img']);
          }
        },
        error: (err) => {
          console.log(err);
          this.route.navigate(['/error']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductSelectedDatas(id: string): void {
    this.fotoService.getAllFotos()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        this.allFotos = response;
        console.log(this.allFotos);
        this.loading = true;
      },
      error: (err) => {
        console.log(err);
        this.route.navigate(['/dashboard']);
      },
      complete: () => {
        this.loading = true;
          const fotoselected = this.allFotos.find((foto: Photo) => foto.id === id);
          console.log(fotoselected);
          if (fotoselected) {
            this.formEditFoto.setValue({
              id: fotoselected.id as string,
              nome: fotoselected.nome as string,
              description: fotoselected.description as string,
              imageurl: fotoselected.imageurl as string,
              thumbnailurl: fotoselected.thumbnailurl as string,
              datacriacao: fotoselected.thumbnailurl as string,
              users: fotoselected.users as string
            });
          }

      }
    });
  }

  onList() {
    this.id = null;
    this.route.navigate(['/apps/fotos/listar-img']);
  }

  onSubmitEdit() {
    if (this.formEditFoto.value && this.formEditFoto.valid) {
      this.fotoService.editFotos(this.formEditFoto.value as Photo)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {

          this.route.navigate(['/apps/fotos/listar-img']);
        },
        error: (err) => {
          console.log(err);
          this.route.navigate(['/error']);
        }
      });
    }
  }

}
