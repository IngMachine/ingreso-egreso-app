import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './model/ingreso-egreso.model';
import { IngresoEgresoService } from './service/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { AppStateR } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  miFormulario: FormGroup = this.fb.group(
    {
      descripcion: [ '', [Validators.required] ],
      monto: [ '', [ Validators.min(0) ] ]
    }
  );

  tipo: string = 'egreso';
  loadingSubs: Subscription;
  cargando: boolean;

  constructor(
    private fb: FormBuilder,
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppStateR>
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui')
                           .subscribe( ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar(): void{

    this.store.dispatch( new ActivarLoadingAction() );

    const ingresoEgreso = new IngresoEgreso({ ...this.miFormulario.value, tipo: this.tipo });

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
        .then( () => {
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
          this.miFormulario.reset({
            monto: 0
          });
        });

    console.log(ingresoEgreso);

  }

}
