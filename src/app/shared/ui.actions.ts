import { Action } from '@ngrx/store';



export enum UIActionTypes {
    ACTIVAR_LOGIN = '[ UI Loading ] Cargando...',
    DESACTIVAR_LOGIN = '[ UI Loading ] Fin de la carga...',
}

export class ActivarLoadingAction implements Action {
    readonly type =  UIActionTypes.ACTIVAR_LOGIN;
}

export class DesactivarLoadingAction implements Action {
    readonly type =  UIActionTypes.DESACTIVAR_LOGIN;
}

export type acciones = ActivarLoadingAction |
                       DesactivarLoadingAction;
