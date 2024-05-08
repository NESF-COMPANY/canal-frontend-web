import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SkeletonModule} from "primeng/skeleton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigurationModule} from "../configuration/configuration.module";
import {UserModule} from "../user/user.module";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {AccountComponent} from "./account/account.component";
import {CreateOrEditAccountComponent} from "./create-or-edit-account/create-or-edit-account.component";
import {CalendarModule} from "primeng/calendar";
import {AccountRoutingModule} from "./account-routing.module";



@NgModule({
  declarations: [AccountComponent,CreateOrEditAccountComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ButtonModule,
        RippleModule,
        SkeletonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigurationModule,
        UserModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        CalendarModule
    ]
})
export class AccountModule { }
