import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withXsrfConfiguration,
} from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { authInterceptor } from '@modules/auth/auth.interceptor';
import { authInitializerProvider } from '@service/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    authInitializerProvider,
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(AngularSvgIconModule.forRoot()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
    ),
    provideEnvironmentNgxMask(),
    provideQuillConfig({
      modules: {
        syntax: false,
        table: true,
        toolbar: [
          ['bold', 'italic', 'underline'], // toggled buttons
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          // [{ direction: 'ltr' }], // text direction
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link'],
        ],
      },
    }),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
