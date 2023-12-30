import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedRequest, SortResultDto } from '../../../dtos/skills';
import { BlogService } from '../../../services/blog.service';
import { GetBlogDto, ListBlogDtos } from '../../../dtos/blog';
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
import { ToDatePipe } from '../../../utils/to-date.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,MatSlideToggleModule,MatRippleModule,MatSelectModule,MatMenuModule, InfiniteScrollModule,MatFormFieldModule, ToDatePipe,MatInputModule, FormsModule,MatIconModule,MatCardModule,MatDividerModule, MatButtonModule,MatListModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  defaultPageSize:number=10;
  defaultPage:number=1;
  filterValue!:string
  defaultOrderByName:string='PublishDate';
  orderBy:boolean=true;
  selectedSort?:string;
   sortingValues=[
    {value:'PublishDate',text:'Publish Date'},
    {value:'Vote',text:'Vote'}
  ]

  request:PaginatedRequest={
    page:this.defaultPage,
    pageSize:this.defaultPageSize,
    orderBy:false,
    orderByPropertname:this.defaultOrderByName,
    filter:this.filterValue
  };
  blogContent!:ListBlogDtos;

  mostVotedBlog!:GetBlogDto[];

  constructor(
    private router:Router,
    private blogService:BlogService,
    private toastrService:ToastrService){}


  ngOnInit(): void {
    this.getBlogs(this.request);
    this.getMostVotedBlog(this.request);
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
      }       
    })
  }

  getMostVotedBlog(request:PaginatedRequest){
    let mostVotedRequest=request;
    mostVotedRequest.orderBy=false;
    mostVotedRequest.orderByPropertname="Vote";
    this.blogService.getBlogs(request).subscribe({
      next:(res)=>{
          this.mostVotedBlog=res.data;
      } })

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
      debugger
      this.request.filter=filter;
      this.getBlogs(this.request);
    }

    sort(){
      debugger
      let sortResult:SortResultDto={
        column:this.selectedSort,
        orderBy:this.orderBy
      };
      this.request.orderBy=this.orderBy;
      this.request.orderByPropertname=this.selectedSort; 
      this.getBlogs(this.request);

    }
  
}
