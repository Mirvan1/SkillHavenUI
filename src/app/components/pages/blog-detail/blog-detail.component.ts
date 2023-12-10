import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBlogDto } from '../../../dtos/blog';
import { BlogService } from '../../../services/blog.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import {  MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule,MatDividerModule,MatIconModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blogId!:number;
  blog!:GetBlogDto;

  constructor(
    private router:ActivatedRoute,
    private blogService:BlogService,
    private userService:UserService
  ){
    this.blogId=router.snapshot.params['id'];
    debugger
  }

  ngOnInit(): void {
    if(this.blogId){
    this.blogService.getBlog(this.blogId).subscribe({
      next:(res)=>{
        if(res){
            this.blog=res;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  }
}
