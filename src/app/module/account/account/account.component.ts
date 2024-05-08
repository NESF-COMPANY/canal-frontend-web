import {Component, Injector, OnInit} from '@angular/core';
import {AbstractRootComponent} from "../../../libs/canal-commons/abstract/AbstractRootComponent";
import {CompanyModel} from "../../../model/companyModel";
import {ColonneTable} from "../../../model/tableObjects/colonneTable";
import {ConfigTable} from "../../../model/tableObjects/ConfigTable";
import {ProductService} from "../../../demo/service/product.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {CompaniesService} from "../../../service/company/companies.service";
import {Table} from "primeng/table";
import {CreateCompanyComponent} from "../../Company/create-company/create-company.component";
import {AccountService} from "../../../service/accounts/account.service";
import {CreateOrEditAccountComponent} from "../create-or-edit-account/create-or-edit-account.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
    providers: [MessageService, ConfirmationService, DialogService]
})
export class AccountComponent extends AbstractRootComponent implements OnInit {

    accounts : any[] = []


    addButton : any = {
        pTooltip:"Ajout d'un compte", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateAccount(null)
    }

    actionButtons: any[] = [
      //  { pTooltip:"Modification du compte", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateAccount(item) },
        {pTooltip:"Suppression du compte", class:'p-button-rounded p-button-danger', icon: 'pi pi-trash', action: (item: any) => this.deleteAccount(item) },
        {pTooltip:"Activation/Désactivation du compte", class:'p-button-rounded p-button-dark', icon: 'pi pi-lock', action: (item: any) => this.ActiveDisableAccount(item) }
    ];
    colonnes: ColonneTable[] = [
        //  { champ: 'logo', entete: 'Logo' },
        { champ: 'firstname', entete: "Nom" },
        { champ: 'lastname', entete: 'Prénom' },
        { champ: 'birthday', entete: "Date d'anniversaire" },
        { champ: 'phone', entete: 'Téléphone' },
        { champ: 'address', entete: 'Adress' }, // Supposons que 'description' est une colonne de type string
       // { champ: 'indiq_phone', entete: 'Descri' }, // Supposons que 'description' est une colonne de type string
        { champ: 'country', entete: 'Pays' } // Supposons que 'description' est une colonne de type string
   ];



    configTable : ConfigTable = {
        dataKey : "config_id",
        rows:10,
        rowsPerPageOptions: [10, 25, 50],
        loading: true,
        paginator: true,
        globalFilterFields : ['label','key','state','description']
    }
    companId = 1;
    constructor( injector: Injector,
                 private productService: ProductService,
                 private readonly dialogService: DialogService,
                 private route: Router,
                 private confirmationService: ConfirmationService,
                 private accountService: AccountService,
                 private messageService: MessageService) {
        super(injector);
    }
    ref!: DynamicDialogRef;



    ngOnInit() {

        this.getAllAccounts();
    }

    getAllAccounts() {
        this.addSubscription("companies" ,this.accountService.getAccount(this.companId).subscribe({
            next: (response: any) => {
                this.accounts = response.data;
                this.configTable.loading = false;
            },
            error: error => {

            }

        }))
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    editOrCreateAccount(item: any | null) {
        this.ref = this.dialogService.open(CreateOrEditAccountComponent, {
            data: {
                account: item
            },
            header: item ? "Modifier le compte " : "Ajouter un compte",
            width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            draggable: true
        });
        this.addSubscription("companies", this.ref.onClose.subscribe(() => {
            this.getAllAccounts()
        }))
    }

    deleteAccount(item: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous supprimer ce compte ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });
    }


    ActiveDisableAccount(data: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous désactivé ce compte ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });

    }

}

