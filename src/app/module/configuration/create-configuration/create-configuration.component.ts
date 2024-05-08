import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from "../../../libs/canal-commons/abstract/AbstractComponent";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {Configurations} from "../../../model/configurations";
import {ConfigurationService} from "../../../service/configuration/configuration.service";

@Component({
  selector: 'app-create-configuration',
  standalone: false,
  templateUrl: './create-configuration.component.html',
  styleUrl: './create-configuration.component.scss'
})
export class CreateConfigurationComponent extends AbstractComponent<Configurations> implements OnInit {

    public configurationForm!: FormGroup | any;

    roles  :any[] = [];
    submitted : boolean = false;
    public errorMessage: any;

    constructor(
        injector: Injector,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig ,
        private configurationService:ConfigurationService,
        private messageService: MessageService,
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        this.selectedDataset = this.dialogConfig.data?.users as Configurations;
        this.configurationForm = this.createFormModel(this.selectedDataset);

    }


    protected createFormModel(data: Configurations): FormGroup {
        return  this.formBuilder.group({
            label: new FormControl(data?.label, Validators.required),
            key: new FormControl(data?.key, Validators.required),
            description: new FormControl(data?.description ?? ""),
        })
    }
    protected override getModelFromForm(): Configurations {
        return Object.assign({} , this.selectedDataset, {
            label: this.configurationForm.get('label')?.value,
            key: this.configurationForm.get('key')?.value,
            description: this.configurationForm.get('description')?.value,
        })
    }

    createGood() {
        this.submitted = true;
        let data = this.getModelFromForm() as unknown as Configurations;
        if (this.configurationForm.valid) {
           this.addSubscription("create" , this.configurationService.addConfigurations(data).subscribe({
                next: (data) => {
                    this.ref.close();
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }

    updateGood() {
        this.submitted = true
        let data = this.getModelFromForm() as unknown  as Configurations;
        if (this.configurationForm.valid) {
            // @ts-ignore
            this.addSubscription("updatePallet" , this.configurationService.updateConfigurations(data,this._selectedDataset.config_id).subscribe({
                next: (data) => {
                    this.ref.close();
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }


}
