import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../ingreso-egreso/service/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  nombre: string;
  email: string;

  constructor(
    public authService: AuthService,
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
        .subscribe( auth => { this.nombre = auth.user?.nombre; this.email = auth.user?.email; } );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void{
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
