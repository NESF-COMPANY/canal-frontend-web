import {Component, Injector, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AbstractRootComponent} from "../../../libs/canal-commons/abstract/AbstractRootComponent";
import {ProductService} from "../../../demo/service/product.service";
import {ConfigurationService} from "../../../service/configuration/configuration.service";
import {Router} from "@angular/router";
import {Table} from "primeng/table";

import {CreateUserComponent} from "../create-user/create-user.component";
import {UserService} from "../../../service/user/user.service";
import {User} from "../../../model/user";
import {ColonneTable} from "../../../model/tableObjects/colonneTable";
@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
    providers: [MessageService, ConfirmationService, DialogService]

})
export class ListUserComponent extends AbstractRootComponent implements OnInit {

    users : User[] = []


    actionButtons: any[] = [
        { class:'p-button-rounded p-button-warning', icon: 'pi pi-pencil', action: (item: any) => this.editOrCreateUser(item) },
        { class:'p-button-rounded p-button-danger', icon: 'pi pi-trash', action: (item: any) => this.deleteUser(item) }
    ];

    colonnes: ColonneTable[] = [
        { champ: 'label', entete: 'Label' },
        { champ: 'key', entete: 'Key' },
        {champ: 'description', entete: 'Description',
        },
    ];
    constructor( injector: Injector,
                 private productService: ProductService,
                 private readonly dialogService: DialogService,
                 private route: Router,
                 private userService: UserService,
                 private messageService: MessageService) {
        super(injector);
    }
    ref!: DynamicDialogRef;



    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.addSubscription("users" ,this.userService.getUsers().subscribe({
            next: (response: any) => {

                this.users = response.data
                console.log(this.users)

            },
            error: error => {
                console.log(error)
            }

        }))
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    editOrCreateUser(data: any | null) {
        this.ref = this.dialogService.open(CreateUserComponent, {
            data: {
                users: data
            },
            header: data ? 'Modifier l\'utilisateur ' : 'Ajouter une utilisateur',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            draggable: true
        });
        this.addSubscription("users", this.ref.onClose.subscribe(() => {
            this.getAllUsers()
        }))
    }


    deleteUser(data: any) {

    }



}
