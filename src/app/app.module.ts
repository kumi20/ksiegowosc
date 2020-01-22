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
import { CommonModule, NgClass  } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { GoogleAnalyticsModule, GA_TOKEN } from 'angular-ga';
import { Ng2PaginationModule } from 'ng2-pagination';

import { FileUploadModule } from 'ng2-file-upload';

import { ApiService } from './api.service';
import { EventService } from './event.service';
import { routerModule} from './app.routing';

import { AuthGuard, AlwaysAuthChildrenGuard } from './auth.guard';

import { TinymceModule } from 'angular2-tinymce';
import { EditorModule } from '@tinymce/tinymce-angular';

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
import { ContactComponent } from './book/contact/contact.component';
import { VatComponent } from './book/vat/vat.component';
import { CountVatComponent } from './book/vat/count-vat/count-vat.component';
import { SiginupComponent } from './siginup/siginup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FixedAssetsComponent } from './book/fixed-assets/fixed-assets.component';
import { AddAssetsComponent } from './book/fixed-assets/add-assets/add-assets.component';


import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";
import { CustomerComponent } from './book/customer/customer.component';
import { AddCutomerComponent } from './book/customer/add-cutomer/add-cutomer.component';
import { CustomerPanelComponent } from './book/customer/customer-panel/customer-panel.component';
import { IndywidualZusComponent } from './book/indywidual-zus/indywidual-zus.component';
import { SearchComponent } from './book/company/search/search.component';
import { SearchFvComponent } from './book/fv/search-fv/search-fv.component';
import { ConfigMaileComponent } from './book/settings/config-maile/config-maile.component';

import { DxButtonModule, DxSelectBoxModule, DxDataGridModule, DxTextBoxModule, DxDateBoxModule, DxNumberBoxModule, DxChartModule,
  DxPopupModule, DxTagBoxModule} from 'devextreme-angular';

import { Locale } from './api.service';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import 'devextreme-intl';
import { IncomeYearComponent } from './book/content/income-year/income-year.component';
import { MonityComponent } from './book/monity/monity.component';
import { AddUserCustomerComponent } from './book/customer/add-user-customer/add-user-customer.component';
import { ContactCustomerListComponent } from './book/customer/contact-customer-list/contact-customer-list.component';
import { ContactCustomerAddComponent } from './book/customer/contact-customer-add/contact-customer-add.component';
import { CustomerFileComponent } from './book/customer/customer-file/customer-file.component';
import { ServicesComponent } from './book/fv/services/services.component';
import { CustomerFileListComponent } from './book/customer/customer-file-list/customer-file-list.component';
import { HistoryComponent } from './book/history/history.component';
import { KmComponent } from './book/km/km.component';
import { AddKmComponent } from './book/km/add-km/add-km.component';

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
        ContactComponent,
        VatComponent,
        CountVatComponent,
        SiginupComponent,
        PageNotFoundComponent,
        FooterComponent,
        HomeComponent,
        FixedAssetsComponent,
        AddAssetsComponent,
        CustomerComponent,
        AddCutomerComponent,
        CustomerPanelComponent,
        IndywidualZusComponent,
        SearchComponent,
        SearchFvComponent,
        ConfigMaileComponent,
        IncomeYearComponent,
        MonityComponent,
        AddUserCustomerComponent,
        ContactCustomerListComponent,
        ContactCustomerAddComponent,
        CustomerFileComponent,
        ServicesComponent,
        CustomerFileListComponent,
        HistoryComponent,
        KmComponent,
        AddKmComponent,
	],
	imports: [
		BrowserModule,
        HttpClientModule,
        FileUploadModule,
        DxButtonModule,
        DxDataGridModule,
        DxDateBoxModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxPopupModule,
        DxNumberBoxModule,
        DxChartModule,
        DxTagBoxModule,
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
        SocialLoginModule,
        SchemaFormModule.forRoot(),
        TinymceModule.withConfig({ 
            height: 350,
			language: "pl",
			gecko_spellcheck: true,
			entity_encoding: 'utf8',
			plugins: [
				"advlist autolink link lists charmap print hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
				"table contextmenu directionality emoticons paste textcolor image code tinymceEmoji"],
			toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent forecolor backcolor | link image'
        }),
        EditorModule
	],
	providers: [ApiService, EventService, AuthGuard, AlwaysAuthChildrenGuard,
               {
                  provide: AuthServiceConfig,
                  useFactory: getAuthServiceConfigs
                }
               ],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }




