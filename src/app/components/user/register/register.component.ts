import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../dtos/skills';
import { UserService } from '../../../services/user.service';
import { ConsultantRegistrationInfo, RegisterUserDto, SupervisorRegistrationInfo, VerifyUserDto } from '../../../dtos/user.dto';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatSelectModule,MatToolbarModule ,MatButtonModule,MatStepperModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstFormGroup = this._formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(25)]],

  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
    lastName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
    role: ['', Validators.required],
    experience: [''],
    description: [''],
    expertise: [''],

    picture: [ '']
  });
  isEditable = false;
  role?=Role;
  mailCode!:string;
  userId!:number;
    showPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private userService:UserService,
    protected router:Router
    ){}

  onFileSelected(event:any) {

    debugger
    if(event?.target?.files?.length > 0) 
    {
      // this.secondFormGroup.patchValue({
      //    picture: event?.target?.files[0],
      // })
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = reader.result as string;
        this.secondFormGroup.patchValue({ picture: base64String });
console.log("base64",base64String);
        // Now you have the file as a base64 string
        // You can assign it to a component property or handle it as needed
      };
      reader.readAsDataURL(event?.target?.files[0]);
 
    }
  }


  onSubmit(){
  console.log("1form:",this.firstFormGroup.value);
  let registerUser:RegisterUserDto={};
  if(this.firstFormGroup.valid){
    registerUser.email=this.firstFormGroup.get('email')?.value!;
registerUser.password=this.firstFormGroup.get('password')?.value!;
  }

  if(this.secondFormGroup.valid){
    registerUser.firstName=this.secondFormGroup.get('firstName')?.value!;
    registerUser.lastName=this.secondFormGroup.get('lastName')?.value!;
    registerUser.profilePicture=this.secondFormGroup.get('picture')?.value!;
    const roleValue=this.secondFormGroup.get('role')?.value!;
debugger
    if(roleValue in Role){
    registerUser.role=Number(roleValue);//Role[roleValue as keyof typeof Role];
    }

    let supervisorInfo:SupervisorRegistrationInfo={};
    if(registerUser.role === Role.Supervisor){
      supervisorInfo.expertise =this.secondFormGroup.get('expertise')?.value!;
      supervisorInfo.description=this.secondFormGroup.get('description')?.value!;
    }
    else{
      supervisorInfo.expertise='';
      supervisorInfo.description='';
    }
//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     puxa nfur zsyd inqb

    let consultantInfo:ConsultantRegistrationInfo={};
    if(registerUser.role === Role.Consultant){
      consultantInfo.experience = Number(this.secondFormGroup.get('experience')?.value!);
      consultantInfo.description=this.secondFormGroup.get('description')?.value!;
    }
    else{
      consultantInfo.experience=0;
      consultantInfo.description='';
    }
    
    registerUser.consultantInfo=consultantInfo;
    registerUser.supervisorInfo=supervisorInfo;


    this.userService.registerUser(registerUser).subscribe({
      next:(res)=>{
        console.log(res);
        this.userId=res;
      }
    })

  console.log("jghjgh",registerUser)  


  }

console.log("2form:",this.secondFormGroup.value);
  }


  confirmMailCode(){
if(this.mailCode && this.userId){
  let request:VerifyUserDto={
    userId:this.userId,
    mailSendCode:this.mailCode
  }
    this.userService.verifyUser(request).subscribe({
      next:(res)=>{
        console.log("result",res);
        this.router.navigateByUrl("login");
      } 
    })
  }
  }
}
