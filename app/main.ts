import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter} from '@ngrx/router';
import {AppComponent} from './app.component';
import {routesConfig} from './routes.config';

bootstrap(AppComponent, [
    provideRouter(routesConfig)
]);