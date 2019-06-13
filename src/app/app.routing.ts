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


import { AuthGuard } from './auth.guard';
// ROUTING
const routesConfig: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'panel', component: PanelComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: ContentComponent, outlet:'panel-outlet', canActivate: [AuthGuard]},
            {path: 'settings', component: SettingsComponent, outlet:'panel-outlet', canActivate: [AuthGuard]},
            {path: 'myProfiles', component: MyProfileComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'income', component: IncomeComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'expenditure', component: ExpenditureComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'kpir', component: KpirComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'internal-evidence', component: InternalEvidenceComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'internal-evidence-add', component: AddComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'internal-evidence-add/:id', component: AddComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'not-paid/:id', component: IncomeNotPaidComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'zus', component: ZusComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'add-zus', component: AddZusComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'tax', component: TaxComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'count-tax', component: CountTaxComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'company', component: CompanyComponentBook, outlet:'panel-outlet', canActivate: [AuthGuard] },
            {path: 'add-company/:id', component: AddCompanyComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
        ]          
    }
  ]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: false,
    useHash: true,
})