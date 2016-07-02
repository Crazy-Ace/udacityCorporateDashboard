import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApiService} from '../../common/api.service';
import {CSVService} from '../../common/csv.service';
import {AsyncPipe} from '@angular/common';

declare var c3: any;

@Component({
    selector: 'fl-report',
    providers: [CSVService],
    pipes: [AsyncPipe],
    templateUrl: 'app/pages/report/report.html'
})

export class ReportComponent implements OnInit {

    @ViewChild('line') lineEl: any;

    lineGraph: any;

    constructor(
        public store: Store<any>,
        private _api: ApiService,
        private _csv: CSVService
    ) {}

    private _customersListener: any;

    ngOnInit(): void {
        this._api.send('customers').subscribe(a => {
            this.store.dispatch({type: 'LOAD_CUSTOMERS', payload: this._csv.parse(a['_body'])})
        });

        this._customersListener = this.store.select('customers').subscribe(a => {
            if (a.length) this._drawLine(a);
        })
    }

    ngOnDestroy(): void {
        this._customersListener.unsubscribe();
    }

    private _drawLine(data): void {

        let column = ['customers'],
            dates = [];

        data.forEach(a => {
           if (dates.indexOf(a.createdOn) === -1) dates.push(a.createdOn);
        });

        dates.forEach(a => column.push(data.filter(b => a === b.createdOn).length));

        console.log(Math.floor(dates.length / 2));

        this.lineGraph = c3.generate({
            bindto: this.lineEl.nativeElement,
            data: {
                columns: [column]
            },
            axis: {
                x: {
                    type: 'category',
                    categories: dates,
                    tick: {
                        rotate: -35,
                        multiline: false
                    },
                    height: 35
                }
            },
            legend: {
                show: false
            }
        });
    }
}