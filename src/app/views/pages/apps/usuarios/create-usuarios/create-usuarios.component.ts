import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/interface/product';
import { SignupUserRequest } from 'src/app/models/interface/signupUserRequest';
import { UsuarioService } from 'src/app/services/users/usuario.service';

@Component({
  selector: 'app-create-usuarios',
  templateUrl: './create-usuarios.component.html',
  styleUrls: ['./create-usuarios.component.scss']
})
export class CreateUsuariosComponent implements OnInit, OnDestroy {

  formUser: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  formEditUser: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    product_id: ['', Validators.required],
    amount: ['', Validators.required]
  });

  id:string | null;
  allProducts: any[] = [];
  loading = false;

  private destroy$ = new Subject<void>();
  constructor(
    private usuarioService: UsuarioService,
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
    if (this.formUser.value && this.formUser.valid) {
      this.usuarioService.signUp(this.formUser.value as SignupUserRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.route.navigate(['/apps/usuarios/listar']);
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
    this.usuarioService.getAllUsers()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        this.allProducts = response;
        console.log(this.allProducts);
        this.loading = true;
      },
      error: (err) => {
        console.log(err);
        this.route.navigate(['/dashboard']);
      },
      complete: () => {
        this.loading = true;
          const productSelected = this.allProducts.find((product: Product) => product.id === id);
          console.log(productSelected);
          if (productSelected) {
            this.formEditUser.setValue({
              name: productSelected.name as string,
              price: productSelected.price as string,
              description: productSelected.description as string,
              product_id: this.id as string,
              amount: productSelected.amount as string
            });
          }

      }
    });
  }

  onList() {
    this.id = null;
    this.route.navigate(['/apps/usuarios/listar']);
  }

  onSubmitEdit() {
    if (this.formEditUser.value && this.formEditUser.valid) {
      this.usuarioService.editUser(this.formEditUser.value as Product)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {

          this.route.navigate(['/apps/usuarios/listar']);
        },
        error: (err) => {
          console.log(err);
          this.route.navigate(['/error']);
        }
      });
    }
  }

}
