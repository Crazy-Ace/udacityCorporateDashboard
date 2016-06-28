import {Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';

declare var Datamap: any;
declare var d3: any;

@Directive({ selector: '[fl-map-draw]' })
export class MapDirective {
    constructor(
        private _el: ElementRef
    ) {}

    @Input('fl-map-draw') set data(value: any) {
        if (value) {
            let map = new Datamap({
                element: this._el.nativeElement,
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
                },
                done: (datamap) => {
                    console.log(document.getElementsByTagName('circle'))
                }
            });

            let temp = [];

            value.forEach(a => {
                temp.push({
                    latitude: a.latitude,
                    longitude: a.longitude,
                    name: a.name,
                    fillKey: Math.floor(Math.random() * 10) + 1 ,
                    radius: a.employees.length * 2
                });
            });

            map.bubbles(temp, {
                popupTemplate: (geo, data) => `
                    <div class="hover_block">
                        <span>Location: ${data.name}</span>
                        <span>Employees: ${data.radius}</span>
                    </div>`
            });
        }
    }

    @Output() bubbleClick: EventEmitter = new EventEmitter();

    clicked(loc: string) {
        this.bubbleClick.emit(loc);
    }
}