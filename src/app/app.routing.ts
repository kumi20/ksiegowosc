import { RouterModule, Routes, CanActivate, RouterLinkActive} from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//component book
import { PanelComponent } from  './book/panel/panel.component';
import { SettingsComponent } from './book/settings/settings.component';
import { MyProfileComponent} from './book/my-profile/my-profile.component';
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
import { FixedAssetsComponent } from './book/fixed-assets/fixed-assets.component';
import { AddAssetsComponent } from './book/fixed-assets/add-assets/add-assets.component';
import { CustomerComponent } from './book/customer/customer.component';
import { CustomerPanelComponent} from './book/customer/customer-panel/customer-panel.component';
import { AddCutomerComponent } from './book/customer/add-cutomer/add-cutomer.component';
import { IndywidualZusComponent } from './book/indywidual-zus/indywidual-zus.component';
import { MonityComponent } from './book/monity/monity.component';

import { HomeComponent } from './home/home.component';


import { AuthGuard, AlwaysAuthChildrenGuard } from './auth.guard';

// ROUTING
const routesConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component:DashboardComponent,
        children:[
            { path: '', component: HomeComponent, outlet:'dashboard-outlet'},
            { path:'siginup', component:SiginupComponent, outlet:'dashboard-outlet'}
        ]
    },
    { path: 'panel', component: PanelComponent, canActivate: [AuthGuard], 
        children: [
            {path: '', component: ContentComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'settings', component: SettingsComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'myProfiles', component: MyProfileComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'income', component: IncomeComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'expenditure', component: ExpenditureComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'kpir', component: KpirComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'internal-evidence', component: InternalEvidenceComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'internal-evidence-add', component: AddComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'internal-evidence-add/:id', component: AddComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'not-paid/:id', component: IncomeNotPaidComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'zus', component: ZusComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'add-zus', component: AddZusComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'tax', component: TaxComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'count-tax', component: CountTaxComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'company', component: CompanyComponentBook, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'add-company/:id', component: AddCompanyComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'add-company/:id/:company', component: AddCompanyComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'fv', component: FvComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'add-user-company', component: AddUserCompanyComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'contact', component: ContactComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'vat', component: VatComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'count-vat', component: CountVatComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard] },
            {path: 'fixxed-assets', component: FixedAssetsComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'add-fixxed-assets', component: AddAssetsComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'add-fixxed-assets/:id', component: AddAssetsComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'customer', component: CustomerComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'customer/:id', component: CustomerPanelComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'add-customer', component: AddCutomerComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'indywidual-zus', component: IndywidualZusComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]},
            {path: 'monity', component: MonityComponent, outlet:'panel-outlet', canActivate: [AuthGuard, AlwaysAuthChildrenGuard]}
        ]          
    },
    { path: '**', component: PageNotFoundComponent }
  ]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: true,
    useHash: true,
})