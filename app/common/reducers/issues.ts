import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Issue} from '../models/issue';

export const issues = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_ISSUES':
            let temp = [...state];
            action.payload.forEach(a => {
                let final = a;
                final.createdOn = new Date(a.createdOn);
                temp.push(final)
            });
            return temp;

        case 'SORT_ISSUES':

            let toUse = textSort;
            if (action.payload.key === 'createdOn') toUse = dateSort;

            return state.sort((a, b) => toUse(a, b, action.payload.key, action.payload.asc));

        case 'TOGGLE_OPEN_ISSUE':
            return state.map(issue => {
                if (issue.id === action.payload.id) return Object.assign({}, issue, {open: !issue.open});
                return issue;
            });

        default:
            return state;
    }
};

export function getActive(id: string) {
    return (state$: Observable<any>) => state$.select(s => s.active);
}

function textSort(i1: Issue, i2: Issue, key: string, asc: boolean): number {
    let a = i1[key].toUpperCase();
    let b = i2[key].toUpperCase();

    if (asc) {
        if (a < b) return -1;
        if (a > b) return 1;
    }

    else {
        if (a > b) return -1;
        if (a < b) return 1;
    }
    return 0;
}

function dateSort(i1: Issue, i2: Issue, key: string, asc: boolean): number {
    return asc ? i1[key] - i2[key] : i2[key] - i1[key];
}