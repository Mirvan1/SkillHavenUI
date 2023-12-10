import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { BlogService } from '../../../../services/blog.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogAddOrUpdate, CreateBlogDto, UpdateBlogDto } from '../../../../dtos/blog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { UserDto } from '../../../../dtos/user.dto';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule,AngularEditorModule,ReactiveFormsModule,HttpClientModule,
    MatInputModule, MatFormFieldModule,MatIconModule,MatButtonModule],
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

  constructor(
    private router:ActivatedRoute,
    private redirectionRoute:Router,
    private blogService:BlogService,
    private userService:UserService
  ){
    this.blogId=  this.router.snapshot.params['id'];
debugger
    this.blogForm= new FormGroup({
      title: new FormControl('',Validators.required),
      content: new FormControl('',[Validators.required,Validators.minLength(50)]),
    });

    if(this.blogId) this.crudType=BlogAddOrUpdate.Update;
    else this.crudType=BlogAddOrUpdate.Add;
  }


  ngOnInit(): void {
    this.userService.getUser$.subscribe((res)=>{this.loggedUser=res!;});

debugger
    if(this.blogId){
      this.blogService.getBlog(this.blogId).subscribe({
      next:(res)=>{
        if(res.userId !== this.loggedUser.userId){
          this.redirectionRoute.navigateByUrl('/');
          alert("Cannot delete others blog content");
        
        }
        debugger
        this.blogForm= new FormGroup({
          title: new FormControl(res.title,Validators.required),
          content: new FormControl(res.content,[Validators.required,Validators.minLength(50)]),
        });
      
      },
      error:(err)=>alert(err)
      });
    }
  }

  submitForm(){

      if(this.crudType==BlogAddOrUpdate.Add){
        let addBlogDto: CreateBlogDto ={
          title:this.blogForm.get('title')?.value,
          content:this.blogForm.get('content')?.value,
          isPublished:true
        };

        this.blogService.createBlog(addBlogDto).subscribe({
        next:(res)=>{console.log(true)},
        error:(err)=>alert(err)
        })
      }
      else if(this.crudType == BlogAddOrUpdate.Update){
        let updateBlogDto: UpdateBlogDto ={
          id:this.blogId!,
          title:this.blogForm.get('title')?.value,
          content:this.blogForm.get('content')?.value,
          isPublished:true
        };

        this.blogService.updateBlog(updateBlogDto).subscribe({
          next:(res)=>{console.log(true)},
          error:(err)=>alert(err)
          })
      }
this.redirectionRoute.navigateByUrl('/blog');
  }



}
