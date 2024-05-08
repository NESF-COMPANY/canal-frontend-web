import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {Menu} from "../model/menu";
import {MenuService} from "../service/menus/menu.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    menus : Menu[] = []

    constructor(
        public layoutService: LayoutService,
        public menuservice : MenuService
    ) { }

    ngOnInit() {
        this. getAllMenu();
        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: [''] }
                ]
            },

            {
                label: 'Gestion',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Entreprise',
                        icon: 'pi pi-building',
                        routerLink: ['/companies']
                    },
                    {
                        label: 'Compte',
                        icon: 'pi pi-folder-open',
                        routerLink: ['/accounts']
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-user',
                        routerLink: ['/users']
                    }


                ]
            },
           {
                label: 'Administration',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Menus',
                        icon: 'pi pi-elli',
                        routerLink: ['/menus']
                    },
                    {
                        label: 'Roles des utilisateurs',
                        icon: 'pi pi-wave-pulse',
                        routerLink: ['/roles']
                    },
                    {
                        label: 'Droits des utilisateurs',
                        icon: 'pi pi-wave-pulse',
                        routerLink: ['/droits']
                    }
                ]
            },
          {
                label: 'Réglages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Configurations',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/configurations']
                    }
                ]
            },
     ];
    }

    getAllMenu(){
        // @ts-ignore
     this.menuservice.getMenus().subscribe({
            next: data => {

                this.menus = data
                console.log(this.menus)
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
