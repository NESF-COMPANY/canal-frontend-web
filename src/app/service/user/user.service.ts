import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {environment} from "../../../environments/environment";
import {CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USERS, UPDATE_USER} from "../../../environments/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.canalBaseUrl + GET_ALL_USERS);
    }

    // GET un utilisateur par ID
    getUser(id: number): Observable<User> {
        const url = `${environment.canalBaseUrl + GET_USERS}/${id}`;
        return this.http.get<User>(url);
    }

    // POST nouvel utilisateur
    addUser(user: User): Observable<User> {
        return this.http.post<User>(environment.canalBaseUrl + CREATE_USER, user);
    }

    // PUT mise à jour d'un utilisateur
    updateUser(user: User, companyId: number, userId: number): Observable<User> {
        const url = `${environment.canalBaseUrl}/api/${companyId}/users/${userId}`;
        return this.http.put<User>(url, user);
    }

    // DELETE un utilisateur par ID
    deleteUser(id: number): Observable<User> {
        const url = `${environment.canalBaseUrl + DELETE_USER}/${id}`;
        return this.http.delete<User>(url);
    }

}
