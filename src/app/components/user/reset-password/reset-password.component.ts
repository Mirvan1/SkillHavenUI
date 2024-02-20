import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ResetPasswordDto } from '../../../dtos/user.dto';
import { RxwebValidators } from '@rxweb/reactive-form-validators';


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
      password: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(25) ]),
      passwordConfirm: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(25),RxwebValidators.compare({fieldName:'password'}) ])
    });
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      
      this.email = params['email'];
      
      this.token=params['value'];
    }
  );  }

  onSubmit(){
    
//if(this.userForm.valid){
  let request:ResetPasswordDto={
    password:this.userForm.get('password')?.value!,
    confirmPassword:this.userForm.get('passwordConfirm')?.value!,
      email:this.email!,
      token:this.token!,

  };
  this.userService.resetPassword(request).subscribe({
    next:(res)=>{
      ;

this.router.navigateByUrl('login');
    } 
  });
  
}

  //}

}
