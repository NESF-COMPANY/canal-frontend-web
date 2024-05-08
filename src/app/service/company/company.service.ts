import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USERS, UPDATE_USER} from "../../../environments/constant";
import {CompanyModel} from "../../model/companyModel";

export class CompanyService {

    constructor(private http: HttpClient) { }

    getCompany(): Observable<CompanyModel[]> {
        return this.http.get<CompanyModel[]>(environment.canalBaseUrl + GET_ALL_USERS);
    }

    // GET un utilisateur par ID
    getCompanyId(id: number): Observable<CompanyModel> {
        const url = `${environment.canalBaseUrl + GET_USERS}/${id}`;
        return this.http.get<CompanyModel>(url);
    }

    // POST nouvel utilisateur
    addCompany(data: CompanyModel): Observable<CompanyModel> {
        return this.http.post<CompanyModel>(environment.canalBaseUrl + CREATE_USER, data);
    }

    // PUT mise à jour d'un utilisateur
    updateCompany(data: CompanyModel, dataId: number): Observable<CompanyModel> {
        const url = `${environment.canalBaseUrl + UPDATE_USER}/${dataId}`;
        return this.http.put<CompanyModel>(url, data);
    }

    // DELETE un utilisateur par ID
    deleteCompany(id: number): Observable<CompanyModel> {
        const url = `${environment.canalBaseUrl + DELETE_USER}/${id}`;
        return this.http.delete<CompanyModel>(url);
    }

}
