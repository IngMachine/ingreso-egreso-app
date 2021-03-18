import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CamposRequerido } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password }: CamposRequerido = this.miFormulario.value;
    this.authService.login( email, password);
  }

}
