export * from './menu.service';
export * from './settings.service';
export * from './startup.service';
export * from './preloader.service';
export * from './translate-lang.service';

import { inject, provideAppInitializer } from '@angular/core';
import { TranslateLangService } from './translate-lang.service';
import { StartupService } from './startup.service';

export function TranslateLangServiceFactory(translateLangService: TranslateLangService) {
  return () => translateLangService.load();
}

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export const appInitializerProviders = [
  provideAppInitializer(() => {
    const initializerFn = TranslateLangServiceFactory(inject(TranslateLangService));
    return initializerFn();
  }),
  provideAppInitializer(() => {
    const initializerFn = StartupServiceFactory(inject(StartupService));
    return initializerFn();
  }),
];
