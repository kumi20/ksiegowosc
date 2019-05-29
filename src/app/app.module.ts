import { ToastModule } from './typescripts/pro/alerts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { AppComponent } from './app.component';
import { MDBSpinningPreloader } from './typescripts/pro/index';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { GoogleAnalyticsModule, GA_TOKEN } from 'angular-ga';

import { ApiService } from './api.service';
import { EventService } from './event.service';
import { routerModule} from './app.routing';

import { AuthGuard } from './auth.guard';

import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider,
} from "angular-6-social-login";

import { DashboardComponent} from './dashboard/dashboard.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { WraperComponentComponent } from './wraper-component/wraper-component.component';
import { TemplateModule } from './template/template.module';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './header/header.component';
import { PanelComponent } from './book/panel/panel.component';
import { NavbarComponent } from './book/navbar/navbar.component';
import { SettingsComponent } from './book/settings/settings.component';
import { MyProfileComponent } from './book/my-profile/my-profile.component';
import { ContentComponent } from './book/content/content.component';
import { IncomeComponent } from './book/income/income.component';



// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("128072974397769")
        }
      ]
  );
  return config;
}


@NgModule({
	declarations: [
		AppComponent,
        DashboardComponent,
        DynamicComponentComponent,
        WraperComponentComponent,
        CompanyComponent,
        HeaderComponent,
        PanelComponent,
        NavbarComponent,
        SettingsComponent,
        MyProfileComponent,
        ContentComponent,
        IncomeComponent
	],
	imports: [
		BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        routerModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TemplateModule,
        ToastModule.forRoot(),
        GoogleAnalyticsModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        MDBBootstrapModulePro.forRoot(),
        SocialLoginModule
	],
	providers: [ApiService, EventService, AuthGuard,
               {
                  provide: AuthServiceConfig,
                  useFactory: getAuthServiceConfigs
                }
               ],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }




