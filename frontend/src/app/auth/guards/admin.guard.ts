import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.authService.user.tipo === 1) {
        return true;
      }
      return this.authService.verificaAutenticacion(1).pipe( // se verifica la autenticacion segun el tipo a traves del auth service y se hace tap para comprobar
        tap( estaAuth => {
          if (!estaAuth){
            this.authService.accesoInvalido('administrador');
            //alert('Acceso restringido, debe ser usuario administrador!');
            this.router.navigate(['/auth/login']);
            return false;
          }
          return true;
        })
      );
    }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.authService.user.tipo === 1) {
        return true;
      }

      return this.authService.verificaAutenticacion(1).pipe(
        tap( estaAuth => {
          if (!estaAuth){
            this.authService.accesoInvalido('administrador');
           // alert('Acceso restringido, debe ser usuario administrador!');
            this.router.navigate(['/auth/login']);
            return false;
          }
          return true;
        })
      );
    }

}
