import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccountComponent} from "./account/account.component";
import {CreateOrEditAccountComponent} from "./create-or-edit-account/create-or-edit-account.component";

const routes: Routes = [
    { path: '', component: AccountComponent },
    { path: 'create-account', component: CreateOrEditAccountComponent },
    /*   { path: 'profile-user', component: ProfileUserComponent },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
