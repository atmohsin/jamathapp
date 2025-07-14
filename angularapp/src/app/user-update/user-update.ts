import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-update',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  providers:[UserService],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css'
})
export class UserUpdate {

    userForm: FormGroup;
    userId!: number;
    selectedRoleId: string = "";
    roles: Role[] = [];

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private roleService: RoleService,
      private route: ActivatedRoute,
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
  
      
       

      this.route.queryParams.subscribe(params => {
          this.userId = params['id'];
          //console.log("test 1"+this.userId);
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

            if (this.userId) {

                this.userService.getUserById(this.userId).subscribe(user => {
                  this.selectedRoleId = user.roleid;
                  console.log("===="+this.selectedRoleId);
                    this.userForm.patchValue({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      password: user.password,
                      mobileno: user.mobileno,
                      roleid: user.roleid
                    });
                });
            }
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete')  
      });
    }

    updateUser() : void {
        if (this.userForm.valid) {
            this.userService.updateUser(this.userId,this.userForm.value).subscribe(() => {
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
function params(arg0: string): any {
  throw new Error('Function not implemented.');
}

