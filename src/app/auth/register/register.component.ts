import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

export interface CamposRequerido {
  nombre: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscrition: Subscription;

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    }
  );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscrition = this.store.select('ui')
                           .subscribe( ui => {
                             this.cargando = ui.isLoading;
                            });
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

  guardar(): void {
    console.log( this.miFormulario.value );
    const valor: CamposRequerido = this.miFormulario.value;
    const { nombre , email, password } = valor;
    this.authService.crearUsuario( nombre, email, password  );
  }

}
