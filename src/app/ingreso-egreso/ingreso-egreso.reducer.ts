import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './model/ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[]
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {
    switch ( action.type ) {
        case fromIngresoEgreso.IngresoEgresoTypesAction.SET_ITEMS:
            return {
                items: [
                    ...action.items.map( item => {
                        return {
                            ...item
                        };
                    })
                ]
            };
        case fromIngresoEgreso.IngresoEgresoTypesAction.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}