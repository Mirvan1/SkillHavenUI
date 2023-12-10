import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedRequest } from '../../../dtos/skills';
import { BlogService } from '../../../services/blog.service';
import { ListBlogDtos } from '../../../dtos/blog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatDividerModule, MatButtonModule,MatListModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  request:PaginatedRequest={
    page:1,
    pageSize:40,
    orderBy:true,
  };
  blogContent!:ListBlogDtos;

  constructor(
    private router:Router,
    private blogService:BlogService){}


  ngOnInit(): void {
    this.blogService.getBlogs(this.request).subscribe({
      next:(res)=>{
        if(res){
          res.data.forEach((x)=>{
            if(!x.photoPath || x.photoPath === undefined || x.photoPath === null){
              x.photoPath='./././assets/cover.png';
            }
          })
            this.blogContent=res;
        }
      },
      error:(err)=>{
        alert(err);
      }      
    })  }

    getBlogDetail(blogId:number){
     this.router.navigate(['blog-detail',blogId]);
    }

}
