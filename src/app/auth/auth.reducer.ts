
import { User } from './model/user.model';
import * as fromAuth from './auth.actions';

export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function authReducer( state = initState, action: fromAuth.acciones): AuthState {

    switch ( action.type ) {
        case fromAuth.AuthTypesAction.SET_USER:
            return {
                user: { ...action.user }
            };
        case fromAuth.AuthTypesAction.UNSET_USER:
            return {
                user: null
            };
        default:
            return state;
    }
}
