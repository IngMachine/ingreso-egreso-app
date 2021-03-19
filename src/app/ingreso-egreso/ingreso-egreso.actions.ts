import { Action } from '@ngrx/store';
import { IngresoEgreso } from './model/ingreso-egreso.model';


export enum IngresoEgresoTypesAction {
    SET_ITEMS = '[Ingreso Egreso] Set Items',
    UNSET_ITEMS = '[Ingreso Egreso] Unset Items'
}

export class SetItemsAction implements Action {
    readonly type = IngresoEgresoTypesAction.SET_ITEMS;

    constructor( public items: IngresoEgreso[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = IngresoEgresoTypesAction.UNSET_ITEMS;
}


export type acciones = SetItemsAction |
                       UnsetItemsAction;