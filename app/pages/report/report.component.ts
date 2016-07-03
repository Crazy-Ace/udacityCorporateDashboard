import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';

declare var c3: any;

@Component({
    selector: 'fl-report',
    pipes: [AsyncPipe],
    templateUrl: 'app/pages/report/report.html'
})

export class ReportComponent implements OnInit {

    @ViewChild('line') lineEl: any;
    @ViewChild('bar') barEl: any;

    lineGraph: any;
    barGraph: any;

    constructor(
        public store: Store<any>
    ) {}

    private _customersListener: any;
    private _issuesListener: any;

    ngOnInit(): void {
        this._customersListener = this.store.select('customers').subscribe(a => {
            if (a.length) this._drawLine(a);
        });

        this._issuesListener = this.store.select('issues').subscribe(a => {
            if (a.length) this._drawBar(a.filter(b => b.open));
        })
    }

    ngOnDestroy(): void {
        this._customersListener.unsubscribe();
        this._issuesListener.unsubscribe();
    }

    private _drawLine(data): void {

        let column = ['customers'],
            dates = [];

        data.forEach(a => {
           if (dates.indexOf(a.createdOn) === -1) dates.push(a.createdOn);
        });

        dates.forEach(a => column.push(data.filter(b => a === b.createdOn).length));

        this.lineGraph = c3.generate({
            bindto: this.lineEl.nativeElement,
            data: {
                columns: [column],
                colors: {
                    customers: '#0d47a1',
                },
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

    private _drawBar(data): void {
        let column = ['issues'],
            dates = [];

        data.forEach(a => {
            if (dates.indexOf(a.createdOn.toDateString()) === -1) dates.push(a.createdOn.toDateString());
        });

        dates.forEach(a => column.push(data.filter(b => a === b.createdOn.toDateString()).length));

        this.barGraph = c3.generate({
            bindto: this.barEl.nativeElement,
            data: {
                columns: [column],
                colors: {
                    issues: '#1b5e20',
                },
                type: 'bar',
            },
            axis: {
                x: {
                    type: 'category',
                    categories: dates,
                    tick: {
                        rotate: -35,
                        multiline: false
                    },
                    height: 65
                }
            },
            legend: {
                show: false
            }
        });
    }
}