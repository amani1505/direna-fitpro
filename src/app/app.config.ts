import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import hljs from 'highlight.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(AngularSvgIconModule.forRoot()),
    provideHttpClient(withFetch()),
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
