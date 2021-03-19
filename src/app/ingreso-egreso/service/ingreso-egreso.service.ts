import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { AuthService } from '../../auth/auth.service';
import firebase from 'firebase';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from '../ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription;
  ingresoEgresoItemsSubcription: Subscription;

  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListener(): void {
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
                                            .pipe(
                                              filter( auth => auth.user != null)
                                            )
                                            .subscribe( 
                                              auth => this.ingresoEgresoItems( auth.user.uid )
                                            );
  }

  private ingresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${ uid }/ingreso-egreso/items`)
                                                  .snapshotChanges()
                                                  .pipe(
                                                    map( docData => {
                                                      return docData.map( doc => {
                                                        return {
                                                          uid: doc.payload.doc.id,
                                                          ...doc.payload.doc.data() as {}
                                                        };
                                                      });
                                                    })
                                                    )
                                                    .subscribe( (coleccion: any[])  => {
                                                      this.store.dispatch( new SetItemsAction( coleccion ) );
                                                    });
  }

  cancelarSubscriptions(): void {
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.ingresoEgresoListenerSubcription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${ user.uid }/ingreso-egreso`)
             .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso( uid: string ): Promise<void> {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${ user.uid }/ingreso-egreso/items/${ uid }`)
                    .delete();
  }
}
