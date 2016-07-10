import {Component, ViewChild, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {equalityTest} from '../../common/equality.test';

declare var Datamap: any;
declare var d3: any;

@Component({
    selector: 'fl-map',
    templateUrl: 'app/pages/map/map.html'
})

export class MapComponent implements OnInit {

    @ViewChild('map') mapEl: any;

    map: any;

    private _locationsListener: any;
    private _locations: any;

    constructor(
        private _store: Store<any>
    ) {}

    ngOnInit(): void {
        // Draw the map
        this._draw();

        this._locationsListener = this._store.select('locations').subscribe(a => {
            if (a && a.length) {
                let change = false;

                if (!this._locations) {
                    this._locations = a;
                    change = true;
                } else {

                    if (this._locations.length !== a.length) {
                        change = true;
                        this._locations = a;
                    }
                    else {
                        for (let i = 0; i < a.length; i++) {
                            if (!equalityTest(this._locations[i], a[i])) {
                                this._locations = a;
                                change = true;
                                break;
                            }
                        }
                    }
                }

                if (change) {
                    this.map.bubbles([]);
                    this._addBubbles(JSON.parse(JSON.stringify(this._locations)))
                }
            }

            else {
                this.map.bubbles([]);
                this._locations = [];
            }
        })
    }

    private _draw() {
        this.map = new Datamap({
            element: this.mapEl.nativeElement,
            responsive: true,
            setProjection: (element) => {
                let projection = d3.geo.equirectangular()
                        .center([30, 50])
                        .rotate([4.4, 0])
                        .scale(700)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]),

                    path = d3.geo.path().projection(projection);

                return {path: path, projection: projection};
            },
            fills: {
                defaultFill: '#66bb6a',
                1: '#e53935',
                2: '#fff59d',
                3: '#ffb74d',
                4: '#ffab91',
                5: '#e0e0e0',
                6: '#4e342e',
                7: '#78909c',
                8: '#00e676',
                9: '#b2ebf2',
                10: '#311b92'
            }
        });
    }

    private _addBubbles(data): void {
        this.map.bubbles(data.map(a => {
            let temp = a;
            temp['radius'] = a.employees;
            temp['fillKey'] = Math.floor(Math.random() * 10) + 1;

            return temp;
        }), {
            popupTemplate: (geo, data) => `
                <div class="hover_block" #bubble>
                    <span>Company Name: ${data.title}</span>
                    <span>Location: ${data.name}</span>
                    <span>Employees: ${data.employees}</span>
                </div>`
        });
    }
}   