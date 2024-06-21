import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideAnimations(), provideAnimationsAsync(),
     provideNativeDateAdapter(),//Date Adapter
     {provide: MAT_DATE_LOCALE, useValue: 'th-TH'}//กำหนด Format เป็น วัน/เดือน/ปี พ.ศ. แบบไทย
    ]
};
