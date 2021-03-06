import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, Request} from '@angular/http';

@Injectable()
export class ApiService {
    constructor (
        private http: Http
    ) {}

    send(name) {

        let url: string;
        
        switch (name) {
            case 'locations':
                url = 'assets/data/locations.json';
                break;
            case 'issues':
                url = 'assets/data/issues.json';
                break;
            case 'customers':
                url = 'assets/data/customers.csv';
                break;
        }
        
        let options = {
            method: RequestMethod.Get,
            url: url,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.request(new Request(options))
            .map(res => {
                let toReturn = res;

                try {
                    toReturn = res.json();
                } catch (err) {}

                return toReturn;
            })
    }
}