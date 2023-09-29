import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/users/usuario.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
    ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if (!this.usuarioService.isLogged()) {
      // logged in so return true
      this.router.navigate(['/auth/login']);
      return false;
    }

    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    this.usuarioService.isLogged();
    return true;
  }
}
