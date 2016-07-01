import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Location} from '../models/location';

export const locations = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_LOCATIONS':
            let temp = [...state];
            action.payload.forEach(a => temp.push(a));
            return temp;
        case 'TOGGLE_ACTIVE':
            return state.map(location => Object.assign({}, location, {active: location.id === action.payload}));
        default:
            return state;
    }
};

export function getActive(id: string) {
    return (state$: Observable<any>) => state$.select(s => s.active);
}