import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../common/api.service';
import {Store} from '@ngrx/store';
import {AsyncPipe, DatePipe} from '@angular/common';
import {SearchPipe} from '../../common/pipes/search.pipe';

@Component({
    selector: 'fl-issues',
    pipes: [AsyncPipe, SearchPipe, DatePipe],
    templateUrl: 'app/pages/issues/issues.html'
})

export class IssuesComponent implements OnInit {

    search: string;
    searchCriteria: string[] = ['title', 'author'];
    ths: any[] = [
        {
            title: 'Title',
            key: 'title',
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
            title: 'Author',
            key: 'author',
            active: false,
            asc: true
        },
        {
            title: 'Created On',
            key: 'createdOn',
            active: false,
            asc: true
        }
    ];

    constructor(
        public store: Store<any>,
        private _api: ApiService
    ) {}

    ngOnInit(): void {
        this._api.send('issues').subscribe(a => {
            this.store.dispatch({type: 'LOAD_ISSUES', payload: a})
        });
    }

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

}