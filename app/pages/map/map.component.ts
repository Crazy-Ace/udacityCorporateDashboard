import {Component, ViewChild, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

declare var Datamap: any;
declare var d3: any;

@Component({
    selector: 'fl-map',
    templateUrl: 'app/pages/map/map.html'
})

export class MapComponent implements OnInit {

    @ViewChild('map') mapEl: any;

    map: any;

    constructor(
        private _store: Store<any>
    ) {}

    private _locationsListener: any;

    ngOnInit(): void {
        // Draw the map
        this._draw();

        this._locationsListener = this._store.select('locations').subscribe(a => {
            this._addBubbles(a)
        })
    }

    private _draw() {
        this.map = new Datamap({
            element: this.mapEl.nativeElement,
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
            temp['radius'] = a.employees.length * 2;
            temp['fillKey'] = Math.floor(Math.random() * 10) + 1;

            return temp;
        }), {
            popupTemplate: (geo, data) => `
                    <div class="hover_block">
                        <span>Company Name: ${data.title}</span>
                        <span>Location: ${data.name}</span>
                        <span>Employees: ${data.employees.length}</span>
                    </div>`
        });
    }
}   