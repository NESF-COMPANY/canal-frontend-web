import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyModel} from "../../model/companyModel";
import {environment} from "../../../environments/environment";
import {
    API,
    COMPANIES,
    CREATE_USER,
    DELETE_USER,
    GET_ALL_USERS,
    GET_USERS,
    UPDATE_USER
} from "../../../environments/constant";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    getCompany(companyId1 : number): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${COMPANIES}`;
        return this.http.get<any>(url,this.httpOptions);
    }


    getCompanyId(companyId1:number,companyId2:number): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${COMPANIES}/${companyId2}`;
        return this.http.get<any>(url,this.httpOptions);
    }


    addCompany(companyId1 : number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${COMPANIES}`;
        return this.http.post<any>(url, data,this.httpOptions);
    }


    updateCompany(companyId1:number,companyId2:number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${COMPANIES}/${companyId2}`;
        return this.http.put<any>(url, data,this.httpOptions);
    }


    deleteCompany(companyId1:number,companyId2:number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${COMPANIES}/${companyId2}`;
        return this.http.delete<any>(url);
    }

}
