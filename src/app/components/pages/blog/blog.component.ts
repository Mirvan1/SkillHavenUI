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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,InfiniteScrollModule,MatFormFieldModule, MatInputModule, FormsModule,MatIconModule,MatCardModule,MatDividerModule, MatButtonModule,MatListModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  defaultPageSize:number=10;
  defaultPage:number=1;

  request:PaginatedRequest={
    page:this.defaultPage,
    pageSize:this.defaultPageSize,
    orderBy:true,
  };
  blogContent!:ListBlogDtos;

  filterValue:string=''

  constructor(
    private router:Router,
    private blogService:BlogService){}


  ngOnInit(): void {
    this.getBlogs(this.request);
  }
  
  getBlogs(request:PaginatedRequest){
    this.blogService.getBlogs(request).subscribe({
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
    })
  }

    getBlogDetail(blogId:number){
     this.router.navigate(['blog-detail',blogId]);
    }
    
    gotoAddBlog(){
      this.router.navigateByUrl("/add-blog");
    }
    onScroll=()=>{
      debugger
      this.defaultPageSize+=this.defaultPageSize;
      this.request.pageSize=this.defaultPageSize;
      this.getBlogs(this.request);
    }


    filterByContent(filter:string){
      this.request.filter=filter;
      this.getBlogs(this.request);
    }

}
