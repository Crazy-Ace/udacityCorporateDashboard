import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Location} from '../models/location';

export const locations = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_LOCATIONS':
            return [
                ...state,
                action.payload
            ];
        case 'TOGGLE_ACTIVE':
            return state.map(location => Object.assign({}, location, {active: location.id === action.payload}));
        default:
            return state;
    }
};

export function getActive(id: string) {
    return (state$: Observable<any>) => state$.select(s => s.active);
}