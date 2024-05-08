import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from "../../../libs/canal-commons/abstract/AbstractComponent";
import {User} from "../../../model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfigurationService} from "../../../service/configuration/configuration.service";
import {MessageService} from "primeng/api";
import {CompanyModel} from "../../../model/companyModel";
import {CompanyService} from "../../../service/company/company.service";
import {CompaniesService} from "../../../service/company/companies.service";

@Component({
  selector: 'app-create-company',
  standalone: false,
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent extends AbstractComponent<CompanyModel> implements OnInit {

    public companyForm!: FormGroup | any;

    roles  :any[] = [];
    submitted : boolean = false;
    public errorMessage: any;

    statutAccounts : any[] = []
    statutCompanies : any[] = []
    typeCompanies : any[] = []

    companId = 1;
    constructor(
        injector: Injector,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private configurationService:ConfigurationService,
        private dialogConfig: DynamicDialogConfig ,
        private companyService:CompaniesService,
        private messageService: MessageService,
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        this.selectedDataset = this.dialogConfig.data?.company as CompanyModel;
        this.companyForm = this.createFormModel(this.selectedDataset);
    this.getConfigurations()
    }

    getConfigurations(){
        this.addSubscription("getTypeCompany",this.configurationService.getConfigurationsById("TYPE_COMPANY").subscribe({
            next: (data) => {
                this.typeCompanies = data.data;
            },
            error: error => {
            }
        }))

        this.addSubscription("getStatutAccount",this.configurationService.getConfigurationsById("STATUS_ACCOUNT").subscribe({
            next: (data) => {
                this.statutAccounts = data.data;
            },
            error: error => {
            }
        }))

        this.addSubscription("getStatutAccount",this.configurationService.getConfigurationsById("STATUS_ACCOUNT").subscribe({
            next: (data) => {
                this.statutCompanies = data.data;
            },
            error: error => {
            }
        }))
    }


    protected createFormModel(data: CompanyModel): FormGroup {
        return  this.formBuilder.group({
            name: new FormControl(data?.name, Validators.required),
            city: new FormControl(data?.city, Validators.required),
            activity: new FormControl(data?.activity, Validators.required),
            address: new FormControl(data?.address, Validators.required),
           // account_id: new FormControl(data?.account_id),
            description: new FormControl(data?.description),
            logo: new FormControl(data?.logo),
            companie_type_id: new FormControl(data?.companie_type_id)
        })
    }


    protected override getModelFromForm(): CompanyModel {
        return Object.assign({} , this.selectedDataset, {
            name: this.companyForm.get('name')?.value,
            city: this.companyForm.get('city')?.value,
            activity: this.companyForm.get('activity')?.value,
            address: this.companyForm.get('address')?.value,
            account_id: 1,
            description: this.companyForm.get('description')?.value,
            logo: this.companyForm.get('logo')?.value,
            companie_type_id: this.companyForm.get('companie_type_id')?.value.config_id
        })
    }

    createCompany() {
        this.submitted = true;
        let data = this.getModelFromForm() as unknown as CompanyModel;
        if (this.companyForm.valid) {
            this.addSubscription("create" , this.companyService.addCompany(this.companId,data).subscribe({
                next: (data) => {
                    this.ref.close(data);
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }

    updateCompany() {
        this.submitted = true
        let data = this.getModelFromForm() as unknown ;
        if (this.companyForm.valid) {
            // @ts-ignore
            this.addSubscription("updatePallet" , this.companyService.updateCompany(this.companId,this._selectedDataset.company_id,data).subscribe({
                next: (data) => {
                    this.ref.close(data);
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }
}
