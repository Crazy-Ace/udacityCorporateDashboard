import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provideRouter} from '@ngrx/router';
import {provideStore} from '@ngrx/store';
import {AppComponent} from './app.component';
import {routesConfig} from './routes.config';
import {ApiService} from './common/api.service';
import {locations} from './common/reducers/locations';
import {issues} from './common/reducers/issues';
import {customers} from './common/reducers/customers';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ApiService,
    provideStore({locations, issues, customers}),
    provideRouter(routesConfig)
]);