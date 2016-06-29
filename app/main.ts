import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provideRouter} from '@ngrx/router';
import {AppComponent} from './app.component';
import {routesConfig} from './routes.config';
import {ApiService} from './common/api.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ApiService,
    provideRouter(routesConfig)
]);