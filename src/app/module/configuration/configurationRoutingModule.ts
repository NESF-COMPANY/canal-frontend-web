import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
 import {ListConfigurationComponent} from "./list-configuration/list-configuration.component";

const routes: Routes = [
    { path: '', component: ListConfigurationComponent },
    /*    { path: 'create-user', component: CreateUserComponent },
        { path: 'profile-user', component: ProfileUserComponent },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
