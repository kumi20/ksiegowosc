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
import { Ng2PaginationModule } from 'ng2-pagination';

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
import { ExpenditureComponent } from './book/expenditure/expenditure.component';
import { KpirComponent } from './book/kpir/kpir.component';
import { InternalEvidenceComponent } from './book/internal-evidence/internal-evidence.component';
import { AddComponent } from './book/internal-evidence/add/add.component';
import { IncomeNotPaidComponent } from './book/income-not-paid/income-not-paid.component';
import { ZusComponent } from './book/zus/zus.component';
import { AddZusComponent } from './book/zus/add-zus/add-zus.component';
import { TaxComponent } from './book/tax/tax.component';
import { CountTaxComponent } from './book/tax/count-tax/count-tax.component';
import { CompanyComponentBook } from './book/company/company.component';
import { AddCompanyComponent } from './book/company/add-company/add-company.component';
import { FvComponent } from './book/fv/fv.component';
import { AddUserCompanyComponent } from './book/add-user-company/add-user-company.component';


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
        IncomeComponent,
        ExpenditureComponent,
        KpirComponent,
        InternalEvidenceComponent,
        AddComponent,
        IncomeNotPaidComponent,
        ZusComponent,
        AddZusComponent,
        TaxComponent,
        CountTaxComponent,
        CompanyComponentBook,
        AddCompanyComponent,
        FvComponent,
        AddUserCompanyComponent,
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
        Ng2PaginationModule,
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




