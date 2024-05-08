import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./UserRoutingModule";
import {ListUserComponent} from "./list-user/list-user.component";
import {DataTableComponent} from "../coreModule/component/data-table/data-table.component";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SkeletonModule} from "primeng/skeleton";
import {CreateUserComponent} from "./create-user/create-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    declarations: [ListUserComponent, CreateUserComponent, DataTableComponent],
    exports: [
        DataTableComponent
    ],


    imports: [
        CommonModule,
        UserRoutingModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ButtonModule,
        RippleModule,
        SkeletonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
    ]
})
export class UserModule { }
