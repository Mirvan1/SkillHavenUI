import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { LoginUserDto } from '../../../dtos/user.dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StreamInvocationMessage } from '@microsoft/signalr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { ErrorResult } from '../../../utils/global.dto';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,FormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email:string
  password:string;
  showPassword: boolean = false;

  constructor(
    private userService:UserService,
    private router:Router,
    private toastr:ToastrService
    ){
      this.email='deneme6@gmail.com';
      this.password='12345';
    }


  ngOnInit(): void {

  }


  getLogin(){
    let request:LoginUserDto={
      email:this.email,
      password:this.password
    };
    this.userService.login(request).subscribe({
     next:(res)=>{
      this.router.navigateByUrl('/home');
      console.log(JSON.stringify(res))
    },
     error:(err:ErrorResult)=>this.toastr.error(err.DetailMessage,`Failed ${err.StatusCode}`)
    }
    )
  }



}
