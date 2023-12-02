import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { LoginUserDto } from '../../../dtos/user.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email!:string;
  password!:string
  constructor(private userService:UserService){}


  ngOnInit(): void {

  }


  getLogin(){
    let request:LoginUserDto={
      email:this.email,
      password:this.password
    };
debugger
    this.userService.login(request).subscribe({
     next:( res)=>console.log(JSON.stringify(res)),
     error:(err)=>alert(JSON.stringify(err))
    }
    )
  }



}
