import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Configurations} from "../../../../model/configurations";
import {ColonneTable} from "../../../../model/tableObjects/colonneTable";
import {ConfigTable} from "../../../../model/tableObjects/ConfigTable";

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

    @Input() buttons: any[] = [];
    @Input() donnees: any[];
    @Input() colonnes: ColonneTable[] = [];
    @Input() titre: string;
    @Input() addButton: any;
    @Input() labelBouton: string;
    @Input() configTable :ConfigTable;

    @Output() clickAjouter: EventEmitter<any> = new EventEmitter();

    // Méthode pour émettre l'événement de clic sur le bouton "Ajouter une company"
    onClickAjouter(): void {
        this.clickAjouter.emit();
    }

    searchValue: string | undefined;
    constructor() {  }


}
