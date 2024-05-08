import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from "../../../libs/canal-commons/abstract/AbstractComponent";
import {CompanyModel} from "../../../model/companyModel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfigurationService} from "../../../service/configuration/configuration.service";
import {CompaniesService} from "../../../service/company/companies.service";
import {MessageService} from "primeng/api";
import {AccountService} from "../../../service/accounts/account.service";


@Component({
  selector: 'app-create-or-edit-account',
  templateUrl: './create-or-edit-account.component.html',
  styleUrl: './create-or-edit-account.component.scss'
})
export class CreateOrEditAccountComponent extends AbstractComponent<CompanyModel> implements OnInit {

    public accountForm!: FormGroup | any;

    roles  :any[] = [];
    submitted : boolean = false;
    public errorMessage: any;

    statutAccounts : any[] = [];
    titles : any[] = [];
    genders : any[] = [];

    companId = 1;
    constructor(
        injector: Injector,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private configurationService:ConfigurationService,
        private dialogConfig: DynamicDialogConfig ,
        private accountService:AccountService,
        private messageService: MessageService,
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        this.selectedDataset = this.dialogConfig.data?.account as any;
        this.accountForm = this.createFormModel(this.selectedDataset);
        this.getConfigurations()
    }

    getConfigurations(){
        this.addSubscription("gettitles",this.configurationService.getConfigurationsById("CIVILITE").subscribe({
            next: (data) => {
                this.titles = data.data;
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

        this.addSubscription("getGenders",this.configurationService.getConfigurationsById("GENRE").subscribe({
            next: (data) => {
                this.genders = data.data;
            },
            error: error => {
            }
        }))
    }


    protected createFormModel(data: any): FormGroup {
        return  this.formBuilder.group({
            firstname : new FormControl(data?.firstname, Validators.required),
            lastname: new FormControl(data?.lastname, Validators.required),
            birthday: new FormControl(   data?.birthday, Validators.required),
            phone: new FormControl(data?.phone, Validators.required),
            address: new FormControl(data?.address, Validators.required),
            indiq_phone: new FormControl(data?.indiq_phone),
            email: new FormControl(data?.email),
            place_of_birth: new FormControl(data?.place_of_birth, Validators.required),
            country: new FormControl(data?.country, Validators.required),
          //  profil: new FormControl(data?.name, Validators.required),
            account_type_id: new FormControl(data?.account_type_id, Validators.required),
            title_id: new FormControl(data?.title_id),
            gender_id: new FormControl(data?.gender_id)
        })
    }


    protected override getModelFromForm(): CompanyModel {
        return Object.assign({} , this.selectedDataset, {
            firstname :  this.accountForm.get('firstname')?.value,
            lastname:  this.accountForm.get('lastname')?.value,
            birthday: this.convertDate(this.accountForm.get('birthday')?.value) ,
            phone:  this.accountForm.get('phone')?.value,
            email:  this.accountForm.get('email')?.value,
            address: this.accountForm.get('address')?.value,
            indiq_phone:  this.accountForm.get('indiq_phone')?.value,
            place_of_birth:  this.accountForm.get('place_of_birth')?.value,
            country:  this.accountForm.get('country')?.value,
            //  profil: new FormControl(data?.name, Validators.required),
            account_type_id:  this.accountForm.get('account_type_id')?.value.config_id,
            title_id:  this.accountForm.get('title_id')?.value.config_id,
            gender_id:  this.accountForm.get('gender_id')?.value.config_id
        })
    }

    create() {
        this.submitted = true;
        let data = this.getModelFromForm() as unknown as CompanyModel;
        if (this.accountForm.valid) {
            this.addSubscription("create" , this.accountService.addAccount(this.companId,data).subscribe({
                next: (data) => {
                    this.ref.close(data);
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }

    update() {
        this.submitted = true
        let data = this.getModelFromForm() as unknown ;
        if (this.accountForm.valid) {
            // @ts-ignore
            this.addSubscription("updatePallet" , this.accountService.updateAccount(this.companId,this._selectedDataset.account_id,data).subscribe({
                next: (data) => {
                    this.ref.close(data);
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }

     convertDate(dateString: string): string {
        const date = new Date(dateString);

        // Récupérer les éléments de la date
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        // Formatage de la date dans le nouveau format
        const newFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return newFormat;
    }
}

