import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../dtos/skills';
import { UserService } from '../../../services/user.service';
import { ConsultantRegistrationInfo, MailUserCheckerDto, RegisterUserDto, SupervisorRegistrationInfo, VerifyUserDto } from '../../../dtos/user.dto';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../../services/device.service';

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
  IsEmailExist:boolean=false;
  @ViewChild(MatStepper) stepper?: MatStepper | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private userService:UserService,
    protected router:Router,
    private toastrService:ToastrService,
    protected deviceService:DeviceService
    ){}

  onFileSelected(event:any) {

    
    if(event?.target?.files?.length > 0) 
    {
      
      
      
      if( event.target.files[0].type.match('image.*')) {

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = reader.result as string;
        this.secondFormGroup.patchValue({ picture: base64String });

        
        
      };
      reader.readAsDataURL(event?.target?.files[0]);
    }
    else{
      this.toastrService.error("Please upload valid image ","Error");
      this.stepper?.previous();

    }

    }
  }

  onStepChange(event:any){
    
    if(this.firstFormGroup.valid && event.selectedIndex ===1){
 
    let request:MailUserCheckerDto={
      email:this.firstFormGroup.get('email')?.value!
    };
    this.userService.mailChecker(request).subscribe({
      next:(res)=>{
        if(res){
           this.stepper?.next();
        }
        else{
          this.stepper?.previous();

          this.toastrService.error('Email already exists.','Error')
        }
      },
      error:()=> this.stepper?.previous()

    });
  }
  }


  onSubmit(){
  
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

    if(roleValue in Role){
    registerUser.role=Number(roleValue);
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
        
        this.userId=res;
      },
      error:()=>this.stepper?.previous()
    })

  


  }


  }


  confirmMailCode(){
if(this.mailCode && this.userId){
  let request:VerifyUserDto={
    userId:this.userId,
    mailSendCode:this.mailCode
  }
    this.userService.verifyUser(request).subscribe({
      next:(res)=>{
        
        this.router.navigateByUrl("login");
        this.toastrService.success('Registered successfully')
      } 
    })
  }
  }
}
