import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import{MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { ChangePasswordDto, UserDto } from '../../dtos/user.dto';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogContent,MatExpansionModule,MatIconModule,MatDividerModule,MatInputModule, MatDialogActions,MatFormFieldModule,MatSelectModule, MatDialogClose, MatButtonModule,ReactiveFormsModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css'
})
export class EditProfileDialogComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  userProfile!:FormGroup ;

  changePassword!:FormGroup;

constructor(
  private fb: FormBuilder,
  private userService:UserService,
  public dialogRef: MatDialogRef<EditProfileDialogComponent>
){
}


  ngOnInit() {
    debugger
    this.userService.getUser$.subscribe({
      next:(res)=>{
        debugger
          if(res){
            debugger
            this.userProfile= this.fb.group({
              userId:new FormControl(res.userId),
              firstName:new FormControl(res.firstName),
              lastName:new FormControl(res.lastName),
              email:new FormControl(res.email),
              role:new FormControl(res.role),
              profilePicture:new FormControl(res.profilePicture)
            });

            this.changePassword=new FormGroup({
              oldPassword:new FormControl(''),
              newPassword:new FormControl(''),
              newConfirmPassword:new FormControl('')
            });
          }
      },
      error:(err)=>alert(err)
    });


   

  }
  
  SubmitUserUpdate(userProfile:FormGroup){
    console.log("save");
    if(!userProfile.valid){
      alert("Not valid");
      return;
    }
    let submitUserUpdateForm:UserDto={
      userId:userProfile.value.userId,
      firstName:userProfile.value.firstName,
      lastName:userProfile.value.lastName,
      email:userProfile.value.email,
      role:userProfile.value.role,
      profilePicture:userProfile.value.profilePicture
    };

    console.log("Submit form:",submitUserUpdateForm);

this.userService.updateUser(submitUserUpdateForm).subscribe({
  next:(res)=>{
    if(res){
      console.log(res);
      
    }
  },
  error:(err)=>{
    alert(JSON.stringify(err));
  }
})
    
  }


  SubmitChangePassword(changePassword:FormGroup){
    if(!changePassword.valid){
      alert("Not valid");
      return;
    }
    let changePasswordForm:ChangePasswordDto={
      oldPassword:changePassword.value.oldPassword,
      newPassword:changePassword.value.newPassword,
      confirmPassword:changePassword.value.newConfirmPassword
    }

    this.userService.changeUserPassword(changePasswordForm).subscribe({
      next:(res)=>{
        if(res){
          console.log('Change pass',res);
        }
      },
      error:(err)=>alert(err)
    });


  }
}
