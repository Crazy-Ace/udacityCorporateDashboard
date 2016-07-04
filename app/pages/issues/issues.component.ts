import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AsyncPipe, DatePipe} from '@angular/common';
import {SearchPipe} from '../../common/pipes/search.pipe';
import {Issue} from '../../common/models/issue';

@Component({
    selector: 'fl-issues',
    pipes: [AsyncPipe, SearchPipe, DatePipe],
    templateUrl: 'app/pages/issues/issues.html'
})

export class IssuesComponent {

    search: string;
    searchCriteria: string[] = ['customerName', 'customerEmail', 'employee'];
    ths: any[] = [
        {
            title: 'Submission Date',
            key: 'createdOn',
            active: false,
            asc: true
        },
        {
            title: 'Customer Name',
            key: 'customerName',
            active: false,
            asc: true
        },
        {
            title: 'Customer Email',
            key: 'customerEmail',
            active: false,
            asc: true
        },
        {
            title: 'Description',
            key: 'description',
            active: false,
            asc: true
        },
        {
            title: 'Closed On',
            key: 'closedOn',
            active: false,
            asc: true
        },
        {
            title: 'Employee',
            key: 'employeeName',
            active: false,
            asc: true
        }
    ];

    constructor(
        public store: Store<any>
    ) {}

    sort(index: number) {
        this.ths.forEach((a, i) => {
            if (i === index) {
                if (a.active) a.asc = !a.asc;
                else a.active = true;
            }
            else a.active = false;
        });

        this.store.dispatch({type: 'SORT_ISSUES', payload: {key: this.ths[index].key, asc: this.ths[index].asc}})
    }

    toggleOpen(issue: Issue) {
        this.store.dispatch({type: 'TOGGLE_OPEN_ISSUE', payload: issue})
    }

}