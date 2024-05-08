import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../../model/menu";
import {environment} from "../../../environments/environment";
import {
    CREATE_CONFIGURATIONS,
    CREATE_MENU,
    DELETE_MENU,
    GET_ALL_CONFIGURATIONS,
    GET_ALL_MENUS,
    GET_MENU, UPDATE_CONFIGURATIONS,
    UPDATE_MENU
} from "../../../environments/constant";
import {Configurations} from "../../model/configurations";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
    httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) { }

    getConfigurations(): Observable<Configurations[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<Configurations[]>(environment.canalBaseUrl + GET_ALL_CONFIGURATIONS, httpOptions);
    }

    getConfigurationsById(key: string): Observable<any> {
        const url = `${environment.canalBaseUrl + CREATE_CONFIGURATIONS}/${key}`;
        return this.http.get<any>(url, this.httpOptions);
    }

    // POST nouvel utilisateur
    addConfigurations(data: Configurations): Observable<Configurations> {
        return this.http.post<Configurations>(environment.canalBaseUrl + CREATE_CONFIGURATIONS, data);
    }

    // PUT mise à jour d'un utilisateur
    updateConfigurations(data: Configurations,dataId:number): Observable<Configurations> {
        const url = `${environment.canalBaseUrl + UPDATE_CONFIGURATIONS}/${dataId}`;
        return this.http.put<Configurations>(url, data);
    }

    // DELETE un utilisateur par ID
    deleteConfigurations(id: number): Observable<Configurations> {
        const url = `${environment.canalBaseUrl + DELETE_MENU}/${id}`;
        return this.http.delete<Configurations>(url);
    }
}
