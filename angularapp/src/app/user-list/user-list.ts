import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FilterPipe} from './filter.pipe';



@Component({
  selector: 'app-user-list',
  imports: [CommonModule,RouterModule,FormsModule,FilterPipe],
  providers: [UserService],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  users: any[] = [];
  public searchInput!: string;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
    {
      next: (users : User[]) => {
          this.users = users;
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete')  
    });
  }

  deleteUser(id:any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    })
  }

  editUser(id:any) {
    console.log(id);
    //this.router.navigate(['/users/edit/'{$id}]);

     this.router.navigate(['/users/edit'],
         {queryParams: {id: id}});
  }
}

