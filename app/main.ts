import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter} from '@ngrx/router';
import {AppComponent} from './app.component';
import {routesConfig} from './routes.config';
import {ApiService} from './common/api.service';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ApiService,
    provideRouter(routesConfig)
]);