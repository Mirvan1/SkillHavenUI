import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { LoginUserDto } from '../../../dtos/user.dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StreamInvocationMessage } from '@microsoft/signalr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ErrorResult } from '../../../utils/global.dto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,MatSlideToggleModule,ReactiveFormsModule,RouterLink,MatToolbarModule,FormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email:string
  password:string;
  showPassword: boolean = false;
  saveSession:boolean=false;
  constructor(
    private userService:UserService,
     public router:Router,
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
debugger
      if(this.saveSession){
        this.userService.getUser().subscribe({
          next:(getUser)=>{
            debugger
            localStorage.setItem("session",JSON.stringify(getUser));
            localStorage.setItem("token",JSON.stringify(res));

          }
        })
      }

      console.log(JSON.stringify(res))
    } 
    }
    )
  }



}
