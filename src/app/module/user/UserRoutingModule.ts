import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {CreateUserComponent} from "./create-user/create-user.component";

const routes: Routes = [
    { path: '', component: ListUserComponent },
   { path: 'create-user', component: CreateUserComponent },
    /* { path: 'profile-user', component: ProfileUserComponent },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
