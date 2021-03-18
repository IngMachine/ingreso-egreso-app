import { Action } from '@ngrx/store';
import { User } from './model/user.model';


export enum AuthTypesAction {
    SET_USER = '[Auth] Set User'
}

export class SetUserAction implements Action {
    readonly type = AuthTypesAction.SET_USER;

    constructor( public user: User) {}
}

export type acciones = SetUserAction;
