import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuth();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.authService.isAuth()
                .pipe(
                  take(1)
                );
  }

}
