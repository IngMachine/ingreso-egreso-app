import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../service/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateR } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  susbscrition: Subscription;

  constructor(
    private store: Store<AppStateR>,
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.susbscrition = this.store.select('ingresoEgreso')
                            .subscribe( ingresoEgreso => {
                              console.log(ingresoEgreso.items);
                              this.items = ingresoEgreso.items;
                            });
  }

  ngOnDestroy(): void {
    this.susbscrition.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ): void{
    this.ingresoEgresoService.borrarIngresoEgreso( item.uid )
        .then( () => {
          Swal.fire('Elemento eliminado', item.descripcion , 'warning');
        });
  }

}
