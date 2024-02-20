import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../../services/user.service';
import { ForgotPasswordDto } from '../../../dtos/user.dto';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,FormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
   email!:string;
  
  constructor(private userService:UserService,
    private toastrService:ToastrService,
    protected location: Location
    ){}

   SendMail(){
    let request:ForgotPasswordDto={
      email:this.email
    }
    this.userService.forgotPassword(request).subscribe({
      next:()=>this.toastrService.success(`Mail send to ${this.email} successfully`)
    })
   }
}
