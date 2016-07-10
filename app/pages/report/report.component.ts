import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {equalityTest} from '../../common/equality.test';

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

    private _customersListener: any;
    private _issuesListener: any;

    private _customers: any;
    private _issues: any;

    constructor(
        public store: Store<any>
    ) {}

    ngOnInit(): void {
        this._customersListener = this.store.select('customers').subscribe(a => {
            if (a && a.length) {
                console.log('vlu', a);
                let change = false;

                if (!this._customers) {
                    this._customers = a;
                    change = true;
                } else {

                    if (this._customers.length !== a.length) {
                        change = true;
                        this._customers = a;
                    }
                    else {
                        for (let i = 0; i < a.length; i++) {
                            if (!equalityTest(this._customers, a)) {
                                this._customers = a;
                                change = true;
                                break;
                            }
                        }
                    }
                }

                if (change) this._drawLine(a);
            }

            else {
                this._customers = [];
                this._drawLine([]);
            }
        });

        this._issuesListener = this.store.select('issues').subscribe(a => {
            if (a && a.length) {
                let change = false;

                if (!this._issues) {
                    this._issues = a;
                    change = true;
                } else {

                    if (this._issues.length !== a.length) {
                        change = true;
                        this._issues = a;
                    }
                    else {
                        for (let i = 0; i < a.length; i++) {
                            if (!equalityTest(this._issues[i], a[i])) {
                                this._issues = a;
                                change = true;
                                break;
                            }
                        }
                    }
                }

                if (change) this._drawBar(a.filter(b => b.open));

            }
            else {
                this._customers = [];
                this._drawBar([]);
            }
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