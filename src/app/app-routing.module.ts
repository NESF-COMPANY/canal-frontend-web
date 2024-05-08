import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'users', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule) },
                    { path: 'accounts', loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule) },
                    { path: 'configurations', loadChildren: () => import('./module/configuration/configuration.module').then(m => m.ConfigurationModule) },
                    { path: 'companies', loadChildren: () => import('./module/Company/company.module').then(m => m.CompanyModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
