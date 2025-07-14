import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"  //Standalone service
})
export class UserService {

    private apiUrl = 'http://localhost:8080/api/';

    constructor(private http:HttpClient) {}

    // Get All Users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl+'users');
    }

    //create user
    createUser(user: User): Observable<any> {
        return this.http.post(this.apiUrl+'users',user);
    }

    // get a single user by id
    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}users/${id}`);
    }

    // update existing users
    updateUser(id: number, user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}users/${id}`,user);
    }

    // Delete a user
    deleteUser(id: number) : Observable<any> {
        return this.http.delete(`${this.apiUrl}users/${id}`);
    }
}