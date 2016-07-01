import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Location} from '../models/location';

@Injectable()
export class LocationActions {
    static SEARCH = '[Location] Search';
    static LOAD_DATA = '[Location] Load Data';
    static MARK_ACTIVE = '[Location] Mark Active';

    search(query: string): Action {
        return {
            type: LocationActions.SEARCH,
            payload: query
        };
    }

    markActive(location: Location): Action {
        return {
            type: LocationActions.MARK_ACTIVE,
            payload: location
        }
    }

    loadData(): Action {
        return {
            type: LocationActions.LOAD_DATA
        };
    }


}
