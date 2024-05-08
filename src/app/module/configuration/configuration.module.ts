import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ConfigurationRoutingModule} from "./configurationRoutingModule";
import {ListConfigurationComponent} from "./list-configuration/list-configuration.component";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {CreateConfigurationComponent} from "./create-configuration/create-configuration.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {UserModule} from "../user/user.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TooltipModule} from "primeng/tooltip";



@NgModule({
    declarations: [ListConfigurationComponent, CreateConfigurationComponent],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        ToolbarModule,
        ToastModule,
        FileUploadModule,
        TableModule,
        DialogModule,
        DropdownModule,
        RadioButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
        RippleModule,
        InputTextareaModule,
        InputTextModule,
        UserModule,
        ConfirmDialogModule,
        TooltipModule
    ],


    providers: [DatePipe,]
})
export class ConfigurationModule { }
