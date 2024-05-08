import {NgModule} from "@angular/core";
import {DataTableComponent} from "../coreModule/component/data-table/data-table.component";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SkeletonModule} from "primeng/skeleton";
import {CreateCompanyComponent} from "./create-company/create-company.component";
import {ListCompanyComponent} from "./list-company/list-company.component";
import {CompanyRoutingModule} from "./CompanyRoutingModule";
import {ConfigurationModule} from "../configuration/configuration.module";
import {UserModule} from "../user/user.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
    declarations: [ListCompanyComponent,CreateCompanyComponent],

    imports: [
        CommonModule,
        CompanyRoutingModule,
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
        DropdownModule
    ]
})
export class CompanyModule { }
