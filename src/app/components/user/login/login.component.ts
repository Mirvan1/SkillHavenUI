import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { LoginUserDto } from '../../../dtos/user.dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StreamInvocationMessage } from '@microsoft/signalr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email:string
  password:string;
  constructor(
    private userService:UserService,
    private router:Router
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
debugger
    this.userService.login(request).subscribe({
     next:(res)=>{
      this.router.navigateByUrl('/home');
      console.log(JSON.stringify(res))
    },
     error:(err)=>alert(JSON.stringify(err))
    }
    )
  }



}
