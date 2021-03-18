import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from '../auth.service';
import { CamposRequerido } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscrition: Subscription

  miFormulario: FormGroup = this.fb.group(
    {
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
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

  login(): void {
    const { email, password }: CamposRequerido = this.miFormulario.value;
    this.authService.login( email, password);
  }

}
