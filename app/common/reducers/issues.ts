import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Issue} from '../models/issue';
import {equalityTest} from '../equality.test';

export const issues = (state = [], action: Action) => {
    switch (action.type) {
        case 'LOAD_ISSUES':
            let temp = [...state];
            if (Array.isArray(action.payload)) {
                action.payload.forEach(a => {
                    let final = a;
                    final.createdOn = new Date(a.createdOn);
                    if (final.closedOn) final.closedOn = new Date(a.closedOn);
                    temp.push(final)
                });  
            }
            return temp;
        
        case 'UPDATE_ISSUES':
            let temp1 = [...state],
                toRemove = [];
            if (Array.isArray(action.payload)) {
                temp1.forEach((a, i) => {
                    let holder = action.payload.find(b => b.id === a.id);
                    if (holder) {
                        holder.createdOn = new Date(holder.createdOn);
                        if (holder.closedOn) holder.closedOn = new Date(holder.closedOn);
                        if (!equalityTest(holder, a)) temp1[i] = holder;
                        action.payload[action.payload.findIndex(b => b.id === a.id)]['checked'] = true;
                    }
                    else toRemove.push(a.id);
                });

                toRemove.forEach(a => temp1.splice(temp1.findIndex(b => b.id === a)), 1);

                action.payload.forEach(a => {
                    if (!a.checked) {
                        let final = a;
                        final.createdOn = new Date(a.createdOn);
                        if (final.closedOn) final.closedOn = new Date(a.closedOn);
                        temp1.push(final)
                    }
                })
            }

            else temp1 = [];
            return temp1;
        case 'SORT_ISSUES':

            let toUse = textSort;
            if (action.payload.key === 'createdOn' || action.payload.key === 'closedOn') toUse = dateSort;

            return state.sort((a, b) => toUse(a, b, action.payload.key, action.payload.asc));

        case 'CLEAR_ISSUES':
            return state = [];

        case 'TOGGLE_OPEN_ISSUE':
            return state.map(issue => {
                if (issue.id === action.payload.id) {
                    if (issue.open) return Object.assign({}, issue, {open: false, employeeName: 'flauc', closedOn: new Date()});
                    else {
                        delete issue.employeeName;
                        delete issue.closedOn;

                        return Object.assign({}, issue, {open: true});
                    }
                }

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

    if (!i1[key]) return -1;
    if (!i2[key]) return 1;

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
    if (!i1[key]) return -1;
    if (!i2[key]) return 1;
    return asc ? i1[key] - i2[key] : i2[key] - i1[key];
}