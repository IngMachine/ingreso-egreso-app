import * as fromUI from './ui.actions';


export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uireducer( state = initState, action: fromUI.acciones ): State {
    switch ( action.type ) {

        case fromUI.UIActionTypes.ACTIVAR_LOGIN:
            return {
                isLoading: true
            };

        case fromUI.UIActionTypes.DESACTIVAR_LOGIN:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}