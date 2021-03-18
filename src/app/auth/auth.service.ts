import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Firabase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { User, DataObj } from './model/user.model';

// ngrx
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetUserAction } from './auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store
  ) { }

  // Se utiliza una sola vez donde se lanza toda la aplicacion (app.component.ts).
  initAuthListener(): void {
    this.afAuth.authState.subscribe( (fbUser: firebase.User )  => {
      if ( fbUser ){
        this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`)
                                         .valueChanges()
                                         .subscribe( (usuarioObj: DataObj) => {
                                           const newUser = new User( usuarioObj );
                                           this.store.dispatch( new SetUserAction( newUser ));
                                           console.log(newUser);
                                          });
      } else {
        this.userSubscription?.unsubscribe();
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ): void{
    this.store.dispatch( new ActivarLoadingAction() );
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
              .doc(`${ user.uid }/usuario`)
              .set( user )
              .then( () => {
                this.router.navigate(['/']);
                this.store.dispatch( new DesactivarLoadingAction() );
              });
        })
        .catch( err => {
          console.log( err );
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire('Error en el login', err.message , 'error' );
        });
  }

  login( email: string, password: string): void {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth
        .signInWithEmailAndPassword( email,  password)
        .then( user => {
          console.log( `[Login] user: `, user  );
          this.store.dispatch( new DesactivarLoadingAction() );
          this.router.navigate(['/']);
        })
        .catch( err => {
          console.log( err );
          this.store.dispatch( new DesactivarLoadingAction() );
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
