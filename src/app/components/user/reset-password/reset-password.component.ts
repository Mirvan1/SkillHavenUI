import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { ErrorResult } from '../../../utils/global.dto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ResetPasswordDto } from '../../../dtos/user.dto';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatToolbarModule,FormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  userForm: FormGroup;
  showPassword=false;
  showConfirmPassword=false;
  email?:string;
  token?:string;

  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private toasterService:ToastrService,
    private router:Router
    ){
    this.userForm = new FormGroup({
      password: new FormControl('', [Validators.required ]),
      passwordConfirm: new FormControl('', [Validators.required ])
    });
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.email = params['email'];
      console.log(this.email); // price
      this.token=params['value'];
    }
  );  }

  onSubmit(){
    debugger
//if(this.userForm.valid){
  let request:ResetPasswordDto={
    password:this.userForm.get('password')?.value!,
    confirmPassword:this.userForm.get('passwordConfirm')?.value!,
      email:this.email!,
      token:this.token!,

  };
  this.userService.resetPassword(request).subscribe({
    next:(res)=>{
      debugger;
console.log(res);
this.router.navigateByUrl('login');
    },
    error:(err)=>{
this.toasterService.error(JSON.stringify(err));
    }
  });
  
}

  //}

}
