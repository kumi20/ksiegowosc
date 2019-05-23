import { RouterModule, Routes, CanActivate, RouterLinkActive} from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//component book
import { PanelComponent } from  './book/panel/panel.component';
import { SettingsComponent } from './book/settings/settings.component';
import { MyProfileComponent} from './book/my-profile/my-profile.component';
import { ContentComponent } from './book/content/content.component';


import { AuthGuard } from './auth.guard';
// ROUTING
const routesConfig: Routes = [
    { path: '', component: DashboardComponent},
    {   path: 'panel', component: PanelComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: ContentComponent, outlet:'panel-outlet', canActivate: [AuthGuard]},
            {path: 'settings', component: SettingsComponent, outlet:'panel-outlet', canActivate: [AuthGuard]},
            {path: 'myProfiles', component: MyProfileComponent, outlet:'panel-outlet', canActivate: [AuthGuard] },
        ]          
    }
  ]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: false,
    useHash: true,
})