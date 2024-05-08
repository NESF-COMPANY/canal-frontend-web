import {Component, Injector, OnInit} from '@angular/core';
import {AbstractRootComponent} from "../../../libs/canal-commons/abstract/AbstractRootComponent";
import {Configurations} from "../../../model/configurations";
import {ColonneTable} from "../../../model/tableObjects/colonneTable";
import {ProductService} from "../../../demo/service/product.service";
import {ConfigurationService} from "../../../service/configuration/configuration.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {CompanyService} from "../../../service/company/company.service";
import {CreateCompanyComponent} from "../create-company/create-company.component";
import {CompanyModel} from "../../../model/companyModel";
import {CompaniesService} from "../../../service/company/companies.service";
import {ConfigTable} from "../../../model/tableObjects/ConfigTable";

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrl: './list-company.component.scss',
    providers: [MessageService, ConfirmationService, DialogService]
})
export class ListCompanyComponent extends AbstractRootComponent implements OnInit {

    companies : CompanyModel[] = []


    addButton : any = {
        pTooltip:"Ajout de l'entreprise", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateCompany(null)
    }

    actionButtons: any[] = [
        { pTooltip:"Modification de l'entreprise", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateCompany(item) },
        {pTooltip:"Suppression de l'entreprise", class:'p-button-rounded p-button-danger', icon: 'pi pi-trash', action: (item: any) => this.deleteCompany(item) },
        {pTooltip:"Activation/Désactivation de l'entreprise", class:'p-button-rounded p-button-dark', icon: 'pi pi-lock', action: (item: any) => this.ActiveDisableEntreprise(item) }
    ];
    colonnes: ColonneTable[] = [
      //  { champ: 'logo', entete: 'Logo' },
        { champ: 'name', entete: "Nom de l'entreprise " },
        { champ: 'city', entete: 'Ville' },
        { champ: 'address', entete: 'Address' },
        { champ: 'activity', entete: 'Activité' },
        { champ: 'description', entete: 'Description' }, // Supposons que 'description' est une colonne de type string
     //   { champ: 'companie_type_id', entete: 'Company Type ID' }
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
                 private companyService: CompaniesService,
                 private messageService: MessageService) {
        super(injector);
    }
    ref!: DynamicDialogRef;



    ngOnInit() {
        this.getAllCompanies();
    }

    getAllCompanies() {
        this.addSubscription("companies" ,this.companyService.getCompany(this.companId).subscribe({
            next: (response: any) => {
                this.companies = response.data;
                this.configTable.loading = false;
            },
            error: error => {

            }

        }))
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    editOrCreateCompany(item: any | null) {
        this.ref = this.dialogService.open(CreateCompanyComponent, {
            data: {
                company: item
            },
            header: item ? "Modifier l'entreprise " : "Ajouter une entreprise",
            width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            draggable: true
        });
        this.addSubscription("companies", this.ref.onClose.subscribe(() => {
            this.getAllCompanies()
        }))
    }

    deleteCompany(item: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous supprimer cette entreprise ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });
    }


    ActiveDisableEntreprise(data: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous désactivé cette entreprise ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });

    }

}

