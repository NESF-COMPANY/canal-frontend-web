import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ACCOUNTS, API} from "../../../environments/constant";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    getAccount(companyId1 : number): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${ACCOUNTS}`;
        return this.http.get<any>(url,this.httpOptions);
    }


  /*  getAccount(companyId1:number,accountID:number): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${ACCOUNTS}/${accountID}`;
        return this.http.get<any>(url,this.httpOptions);
    }*/


    addAccount(companyId1 : number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${ACCOUNTS}`;
        return this.http.post<any>(url, data,this.httpOptions);
    }


    updateAccount(companyId1:number,accountID:number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${ACCOUNTS}/${accountID}`;
        return this.http.put<any>(url, data,this.httpOptions);
    }


    deleteAccount(companyId1:number,companyId2:number,data:any): Observable<any> {
        const url = `${environment.canalBaseUrl}/${API}/${companyId1}/${ACCOUNTS}/${companyId2}`;
        return this.http.delete<any>(url);
    }

}
