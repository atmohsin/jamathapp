import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";

@Injectable({
    providedIn: "root"  //Standalone service
})
export class RoleService {

    private apiUrl = 'http://localhost:8080/api/';

    constructor(private http:HttpClient) {}

    // Get All Users
    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl+'roles');
    }

    
}