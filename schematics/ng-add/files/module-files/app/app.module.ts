import { NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';<% if(animations!='excluded') { %>
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';<% } %>

import { AppComponent } from './app.component';

import { CoreModule } from '@ng-matero/core/core.module';
import { ThemeModule } from '@ng-matero/theme/theme.module';
import { SharedModule } from '@ng-matero/shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { FormlyConfigModule } from './formly-config';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';
import { BASE_URL, httpInterceptorProviders, appInitializerProviders } from '@ng-matero/core';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

import { LoginService } from '@ng-matero/core/authentication/login.service';
import { FakeLoginService } from './fake-login.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    ThemeModule,
    SharedModule,
    RoutesModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),<% if(animations!='excluded') { %>
    provideAnimationsAsync(<% if(animations=='disabled') { %>'noop'<% } %>),<% } %>
    provideToastr(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    { provide: BASE_URL, useValue: environment.baseUrl },
    // ==================================================
    // 👇 ❌ Remove it in the realworld application
    //
    { provide: LoginService, useClass: FakeLoginService },
    //
    // ==================================================
    ...httpInterceptorProviders,
    ...appInitializerProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
