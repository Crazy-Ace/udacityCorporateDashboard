import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Location} from '../models/location';
import {equalityTest} from '../equality.test';

export const locations = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_LOCATIONS':
            let temp = [...state];
            if (Array.isArray(action.payload)) action.payload.forEach(a => temp.push(a));
            return temp;
        case 'UPDATE_LOCATIONS':
            let temp1 = [...state];
            if (Array.isArray(action.payload)) {
                temp1.forEach((a, i) => {
                    let holder = action.payload.find(b => b.id === a.id);
                    if (holder) {
                        if (!equalityTest(holder, a)) temp1[i] = holder;
                        action.payload[action.payload.findIndex(b => b.id === a.id)]['checked'] = true;
                    }
                    else temp1.splice(i, 1);
                });

                action.payload.forEach(a => {
                    if (!a.checked) temp1.push(a)
                })
            }
            return temp1;
        case 'CLEAR_LOCATIONS':
            return state = [];
        case 'TOGGLE_ACTIVE':
            return state.map(location => Object.assign({}, location, {active: location.id === action.payload}));
        default:
            return state;
    }
};

export function getActive(id: string) {
    return (state$: Observable<any>) => state$.select(s => s.active);
}