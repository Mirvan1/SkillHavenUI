import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { GetBlogDto, VoteBlogDto } from '../../../dtos/blog';
import { BlogService } from '../../../services/blog.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BlogDetailCommentComponent } from '../blog/blog-detail-comment/blog-detail-comment.component';
import { ToDatePipe } from '../../../utils/to-date.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule,MatDividerModule,MatIconModule,MatButtonModule,BlogDetailCommentComponent,ToDatePipe],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blogId!:number;
  blog!:GetBlogDto;
  openCommentDrawer=false;

  constructor(
    private router:ActivatedRoute,
    private redirectRoute:Router,
    private blogService:BlogService,
    public userService:UserService,
   protected location: Location
  ){
    this.blogId=router.snapshot.params['id'];
    
  }

  ngOnInit(): void {
    if(this.blogId){
    this.blogService.getBlog(this.blogId).subscribe({
      next:(res)=>{
        if(res){
            this.blog=res;
        }
      } 
    })
  }
  }


  updateBlog(blogId:number){
    this.redirectRoute.navigate(['update-blog',blogId]);
  }


  vote(blogId:number,isIncreased:boolean){
    let request:VoteBlogDto={
      isIncreased:isIncreased,
      blogId:blogId
    }
    this.blogService.voteBlog(request).subscribe({
      next:(res)=>{
        this.blog.vote=res;
          
      }  })
  }



  
drawerOpen=($e:boolean)=>  this.openCommentDrawer=$e;

}
