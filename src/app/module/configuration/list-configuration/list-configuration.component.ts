import {Component, Injector, OnInit} from '@angular/core';
import {ProductService} from "../../../demo/service/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Configurations} from "../../../model/configurations";
import {ConfigurationService} from "../../../service/configuration/configuration.service";
import {AbstractRootComponent} from "../../../libs/canal-commons/abstract/AbstractRootComponent";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {CreateConfigurationComponent} from "../create-configuration/create-configuration.component";
import {ColonneTable} from "../../../model/tableObjects/colonneTable";
import {ConfigTable} from "../../../model/tableObjects/ConfigTable";

@Component({
  selector: 'app-list-configuration',
  standalone: false,
  templateUrl: './list-configuration.component.html',
  styleUrl: './list-configuration.component.scss',
    providers : [MessageService, ConfirmationService, DialogService]
})
export class ListConfigurationComponent extends AbstractRootComponent implements OnInit {

    configurations : Configurations[] = []


    addButton : any = {
        pTooltip:"Ajout de la configuration", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateConfiguration(null)
    }

    actionButtons: any[] = [
        { pTooltip:"Modification de la configuration", class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateConfiguration(item) },
        {pTooltip:"Suppression de la configuration", class:'p-button-rounded p-button-danger', icon: 'pi pi-trash', action: (item: any) => this.deleteConfiguration(item) },
        {pTooltip:"Activation/Désactivation de la configuration", class:'p-button-rounded p-button-dark', icon: 'pi pi-lock', action: (item: any) => this.ActiveDisableConfiguration(item) }
    ];

    colonnes: ColonneTable[] = [
        { champ: 'label', entete: 'Label' },
        { champ: 'key', entete: 'Clé' },
        { champ: 'state', entete: 'Etat',isBoolean : true,booleanValue :{ true : 'Activé' , false : 'désactive'} },
        { champ: 'description', entete: 'Description' }
    ];
    configTable : ConfigTable = {
        dataKey : "config_id",
        rows:10,
        rowsPerPageOptions: [10, 25, 50],
        loading: true,
        paginator: true,
        globalFilterFields : ['label','key','state','description']
    }

    constructor( injector: Injector,
        private productService: ProductService,
        private configurationService:ConfigurationService,
        private readonly dialogService: DialogService,
        private route: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) {
           super(injector);
    }
        ref!: DynamicDialogRef;



    ngOnInit() {
        this.getAllConfigurations();
    }

    getAllConfigurations() {
        this.addSubscription("configurations" ,this.configurationService.getConfigurations().subscribe({
            next: (response: any) => {
                this.configurations = response.data;
                this.configTable.loading = false;
            },
            error: error => {

            }

        }))
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    editOrCreateConfiguration(item: any | null) {
        this.ref = this.dialogService.open(CreateConfigurationComponent, {
            data: {
                users: item
            },
            header: item ? 'Modifier configuration ' : 'Ajouter une configuration',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            draggable: true
        });
        this.addSubscription("users", this.ref.onClose.subscribe(() => {
            this.getAllConfigurations()
        }))
    }


    deleteConfiguration(data: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous supprimer cette configuration ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });

    }
    ActiveDisableConfiguration(data: any) {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous désactivé cette configuration ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            },
            reject: () => {

            }
        });

    }
}

