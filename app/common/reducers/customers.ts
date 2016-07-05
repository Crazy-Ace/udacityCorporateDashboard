import '@ngrx/core/add/operator/select';
import {Action} from '@ngrx/store';

export const customers = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_CUSTOMERS':
            let temp = [...state];
            action.payload.forEach(a => temp.push(a));
            return temp;
        case 'CLEAR_CUSTOMERS':
            return state = [];
        default:
            return state;
    }
};