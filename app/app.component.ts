import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiService} from './common/api.service';
import {CSVService} from './common/csv.service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'fl-app',
    providers: [CSVService],
    templateUrl: './app/app.html'
})

export class AppComponent implements OnInit, OnDestroy {

    private _pullInterval: any;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _csv: CSVService
    ) {}
    
    ngOnInit(): void {
        this._loadData();

        this._pullInterval = setInterval(() => {
            this._loadData();
        }, 1000)
    }

    ngOnDestroy(): void {
        clearInterval(this._pullInterval)
    }

    private _loadData() {
        // Load all the required data
        this._api.send('issues').subscribe(a => {
            this._store.dispatch({type: 'CLEAR_ISSUES', payload: null});
            this._store.dispatch({type: 'LOAD_ISSUES', payload: a});
        });

        this._api.send('customers').subscribe(a => {
            this._store.dispatch({type: 'CLEAR_LOCATIONS', payload: null});
            this._store.dispatch({type: 'LOAD_CUSTOMERS', payload: this._csv.parse(a['_body'])})
        });

        this._api.send('locations').subscribe(a => {
            this._store.dispatch({type: 'CLEAR_LOCATIONS', payload: null});
            this._store.dispatch({type: 'LOAD_LOCATIONS', payload: a})
        });
    }
}