import '@ngrx/core/add/operator/select';
import {Action} from '@ngrx/store';
import {equalityTest} from '../equality.test';

export const customers = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_CUSTOMERS':
            let temp = [...state];
            if (Array.isArray(action.payload)) action.payload.forEach(a => temp.push(a));
            return temp;
        case 'UPDATE_CUSTOMERS':
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
        case 'CLEAR_CUSTOMERS':
            return state = [];
        default:
            return state;
    }
};