import {Component, OnInit} from '@angular/core';
import {ApiService} from './common/api.service';
import {CSVService} from './common/csv.service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'fl-app',
    providers: [CSVService],
    templateUrl: './app/app.html'
})

export class AppComponent implements OnInit {
    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _csv: CSVService
    ) {}
    
    ngOnInit(): void {
        // Load all the required data
        this._api.send('issues').subscribe(a => {
            this._store.dispatch({type: 'LOAD_ISSUES', payload: a})
        });

        this._api.send('customers').subscribe(a => {
            this._store.dispatch({type: 'LOAD_CUSTOMERS', payload: this._csv.parse(a['_body'])})
        });

        this._api.send('locations').subscribe(a => {
            this._store.dispatch({type: 'LOAD_LOCATIONS', payload: a})
        });
    }
}