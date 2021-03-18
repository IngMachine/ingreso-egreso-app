import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  guardar(): void {
    console.log( this.miFormulario.value );
    const valor: CamposRequerido = this.miFormulario.value;
    const { nombre , email, password } = valor;
    this.authService.crearUsuario( nombre, email, password  );
  }

}
