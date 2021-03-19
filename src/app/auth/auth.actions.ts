import { Action } from '@ngrx/store';
import { User } from './model/user.model';


export enum AuthTypesAction {
    SET_USER = '[Auth] Set User',
    UNSET_USER = '[Auth] Unset User'
}

export class SetUserAction implements Action {
    readonly type = AuthTypesAction.SET_USER;

    constructor( public user: User) {}
}

export class UnsetUserAction implements Action {
    readonly type = AuthTypesAction.UNSET_USER;

}

export type acciones = SetUserAction |
                       UnsetUserAction;
