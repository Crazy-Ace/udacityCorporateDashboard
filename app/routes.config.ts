import {Routes} from '@ngrx/router';
import {IssuesComponent} from './pages/issues/issues.component';
import {MapComponent} from './pages/map/map.component';
import {ReportComponent} from './pages/report/report.component';

export const routesConfig: Routes = [
    {
        path: '/',
        component: IssuesComponent
    },
    {
        path: '/map',
        component: MapComponent,
    },
    {
        path: '/report',
        component: ReportComponent
    }
];