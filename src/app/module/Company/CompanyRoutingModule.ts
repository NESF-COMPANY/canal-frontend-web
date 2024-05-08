import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListCompanyComponent} from "./list-company/list-company.component";
import {CreateCompanyComponent} from "./create-company/create-company.component";

const routes: Routes = [
    { path: '', component: ListCompanyComponent },
    { path: 'create-company', component: CreateCompanyComponent },
    /*   { path: 'profile-user', component: ProfileUserComponent },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }
