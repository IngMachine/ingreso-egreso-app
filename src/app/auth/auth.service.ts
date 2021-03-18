import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) { }

  // Se utiliza una sola vez donde se lanza toda la aplicacion (app.component.ts).
  initAuthListener(): void {
    this.afAuth.authState.subscribe( (fbUser: firebase.User )  => {
      console.log( fbUser?.email );
    });
  }

  crearUsuario( nombre: string, email: string, password: string ): void{
    this.afAuth
        .createUserWithEmailAndPassword( email,  password)
        .then( resp => {
          console.log( `[CrearUsuario] user: `, resp );
          const user: User = {
            uid: resp.user.uid,
            nombre,
            email: resp.user.email
          };
          this.afDB
              .doc(`usuario/${ user.uid }`)
              .set( user )
              .then( () => {
                this.router.navigate(['/']);
              });
        })
        .catch( err => {
          console.log( err );
          Swal.fire('Error en el login', err.message , 'error' );
        });
  }

  login( email: string, password: string): void {
    this.afAuth
        .signInWithEmailAndPassword( email,  password)
        .then( user => {
          console.log( `[Login] user: `, user  );
          this.router.navigate(['/']);
        })
        .catch( err => {
          console.log( err );
          Swal.fire('Error en el login', err.message , 'error' );
        });
  }

  logout(): void {

    this.router.navigate(['/login']);
    this.afAuth.signOut();

  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState
               .pipe(
                 map( fbUser => {
                   if ( fbUser == null ){
                     this.router.navigate( ['/login'] );
                   }
                   return fbUser != null;
                  })
               );
  }
}
