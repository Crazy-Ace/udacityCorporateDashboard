import {Component} from '@angular/core';
import {MapDirective} from './map.directive';
import {ApiService} from '../../common/api.service';
import {Employee} from './employee.interface';

@Component({
    selector: 'fl-map',
    directives: [MapDirective],
    templateUrl: 'app/pages/map/map.html'
})

export class MapComponent {
    constructor(
        private _api: ApiService
    ) {}

    data: any;
    employees: Employee[];

    ngOnInit(): void {
        this._api.send('locations').subscribe(a => {
            this.data = a;
        })
    }
    
    empSelect(loc: string): void {
        this.employees = this.data.find(a => a.loc === loc).employees;
    }
}   