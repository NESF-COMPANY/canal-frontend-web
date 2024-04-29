import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {
    CREATE_MENU,
    DELETE_MENU,
    GET_ALL_MENUS,
    GET_MENU, UPDATE_MENU,
} from "../../../environments/constant";
import {Menu} from "../../model/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {


    constructor(private http: HttpClient) { }

    getMenus(): Observable<Menu[]> {
        // Définir les en-têtes de la requête
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json', // Ajoutez ici vos en-têtes personnalisés
                'Content-Type': 'application/json' // Ajoutez ici vos en-têtes personnalisés
            })
        };

        // Effectuer la requête HTTP en utilisant les en-têtes définis
        return this.http.get<Menu[]>(environment.canalBaseUrl + GET_ALL_MENUS, httpOptions);
    }

    // GET un utilisateur par ID
    getMenu(id: number): Observable<Menu> {
        const url = `${environment.canalBaseUrl + GET_MENU}/${id}`;
        return this.http.get<Menu>(url);
    }

    // POST nouvel utilisateur
    addMenu(menu: Menu): Observable<Menu> {
        return this.http.post<Menu>(environment.canalBaseUrl + CREATE_MENU, menu);
    }

    // PUT mise à jour d'un utilisateur
    updateMenu(menu: Menu): Observable<Menu> {
        const url = `${environment.canalBaseUrl + UPDATE_MENU}/${menu.id}`;
        return this.http.put<Menu>(url, menu);
    }

    // DELETE un utilisateur par ID
    deleteMenu(id: number): Observable<Menu> {
        const url = `${environment.canalBaseUrl + DELETE_MENU}/${id}`;
        return this.http.delete<Menu>(url);
    }
}
