import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { BlogService } from '../../../../services/blog.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogAddOrUpdate, CreateBlogDto, GetBlogTopicDto, ListGetBlogTopicDto, UpdateBlogDto } from '../../../../dtos/blog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { UserDto } from '../../../../dtos/user.dto';
import { PaginatedRequest } from '../../../../dtos/skills';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule,AngularEditorModule,ReactiveFormsModule,HttpClientModule,
    MatInputModule, MatFormFieldModule,MatIconModule,MatButtonModule,MatSelectModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {
  blogId?:number;
  htmlBlogContent:string='';
  crudType!:BlogAddOrUpdate;

  blogForm!:FormGroup;
  loggedUser!:UserDto;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  blogTopics!:GetBlogTopicDto[];
  //blogTopicsControl = new FormControl();

  constructor(
    private router:ActivatedRoute,
    private redirectionRoute:Router,
    private blogService:BlogService,
    private userService:UserService,
    private toastrService:ToastrService,
    protected location:Location
  ){
    this.blogId=  this.router.snapshot.params['id'];
debugger
    this.blogForm= new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      photo:new FormControl(''),
      blogTopics:new FormControl(null,Validators.required),
      content: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(1000)]),
    });

    if(this.blogId) this.crudType=BlogAddOrUpdate.Update;
    else this.crudType=BlogAddOrUpdate.Add;
  }


  ngOnInit(): void {
    this.userService.getUser$.subscribe((res)=>{this.loggedUser=res!;});
    this.getBlogTopics();

debugger
    if(this.blogId){
      this.blogService.getBlog(this.blogId).subscribe({
      next:(res)=>{
        if(res.userId !== this.loggedUser.userId){
          this.redirectionRoute.navigateByUrl('/');
          this.toastrService.error("Cannot delete others blog content");
        
        }
        console.log("loggg",this.blogTopics.find(x=>x.blogTopicId===res.blogTopicId)) 
        debugger
        this.blogForm= new FormGroup({
          title: new FormControl(res.title,Validators.required),
          blogTopics:new FormControl(null,Validators.required),
          content: new FormControl(res.content,[Validators.required,Validators.minLength(50)]),
        });
        this.blogForm.get('blogTopics')?.setValue(this.blogTopics.find(x => x.blogTopicId === res.blogTopicId)?.blogTopicId);

      console.log("form",this.blogForm);
      
      } });
    }
  }

  submitForm(){

      if(this.crudType==BlogAddOrUpdate.Add){
        let addBlogDto: CreateBlogDto ={
          title:this.blogForm.get('title')?.value,
          photo:this.blogForm.get('photo')?.value,
          content:this.blogForm.get('content')?.value,
          isPublished:true,
          blogTopicId:this.blogForm.get('blogTopics')?.value
        };
debugger
        this.blogService.createBlog(addBlogDto).subscribe({
        next:(res)=>{
          this.redirectionRoute.navigateByUrl('/blog');

          console.log(true)}  })
      }
      else if(this.crudType == BlogAddOrUpdate.Update){
        let updateBlogDto: UpdateBlogDto ={
          id:this.blogId!,
          title:this.blogForm.get('title')?.value,
          photo:this.blogForm.get('photo')?.value,
          content:this.blogForm.get('content')?.value,
          isPublished:true,
          blogTopicId:this.blogForm.get('blogTopics')?.value

        };
debugger
        this.blogService.updateBlog(updateBlogDto).subscribe({
          next:(res)=>{
            this.redirectionRoute.navigateByUrl('/blog');

            console.log(true)} })
      }
  }

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
        this.blogForm.patchValue({ photo: base64String });
console.log("base64",base64String);
        // Now you have the file as a base64 string
        // You can assign it to a component property or handle it as needed
      };
      reader.readAsDataURL(event?.target?.files[0]);
 
    }
  }


  getBlogTopics(){
    let request:PaginatedRequest={
      page:1,
      pageSize:10,
      orderBy:true,
      orderByPropertname:'TopicName'
    }
    this.blogService.getTopics(request).subscribe({
      next:(res)=>{
          this.blogTopics=res.data;

      }
    })
  }

}
