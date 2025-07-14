import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
  providers: [UserService]
})
export class UserCreate implements OnInit {

  roles: Role[] = [];

  selectedRoleId!: '';


   userForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private roleService: RoleService,
      private router:Router
    ) {
       this.userForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        mobileno: new FormControl('', Validators.required),
        roleid: new FormControl(this.selectedRoleId),
      });
    }

    ngOnInit(): void {
      this.getRoles();
    }

    getRoles() {
      this.roleService.getRoles().subscribe(
      {
        next: (roles : Role[]) => {
            this.roles = roles;
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete')  
      });
    }

    createUser() : void {
      
        if (this.userForm.valid) {
            console.log(this.userForm.value);
            
          this.userService.createUser(this.userForm.value).subscribe(() => {
            this.router.navigate(['/users']);
          });
        }
    }

    onChange(value: any):void {
      console.log('on change'+value.target.value);
      this.selectedRoleId = value.target.value;
      this.userForm.patchValue({
          roleid: this.selectedRoleId
      });
    }
    
    goToPage(pageName:string){
      this.router.navigate([`${pageName}`]);
    }
}
