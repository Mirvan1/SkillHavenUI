import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { BlogService } from '../../../../services/blog.service';
import { BlogCommentsDto, GetBlogCommentsDto, ListBloCommentsDtos } from '../../../../dtos/blog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDrawer, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-blog-detail-comment',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatSidenavModule, MatButtonModule],
  templateUrl: './blog-detail-comment.component.html',
  styleUrl: './blog-detail-comment.component.css'
})
export class BlogDetailCommentComponent implements OnInit,OnChanges {
@Input() blogId!:number;

blogComments!:ListBloCommentsDtos;
showFiller = false;
@Input() isDrawerOpen=false;
@ViewChild('sidenav') sidenav?: MatSidenav;

constructor(
    private userService:UserService,
    private blogService:BlogService,
    private renderer: Renderer2,
  ){
  
   }

  ngOnChanges(changes: any):void{
    debugger
    this.isDrawerOpen=changes['isDrawerOpen'].currentValue;
    if(  this.isDrawerOpen
      ){
        this.renderer.setStyle(document.body, 'background',' rgba(255,255,255,0.4)');

      this.sidenav?.open()


  }
  else{
    this.sidenav?.close()
  }
  }

  ngOnInit(): void {
    if(this.blogId ){
    const request:GetBlogCommentsDto={
      blogId:this.blogId,
      page:1,
      pageSize:40,
      orderBy:true
    };
    this.blogService.getBlogComments(request).subscribe({
      next:(res)=>{
        this.blogComments=res;
      },
      error:(err)=>alert(err)
    })
  }
}

}
