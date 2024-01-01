import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { BlogService } from '../../../../services/blog.service';
import { BlogCommentsDto, CreateBlogCommentDto, GetBlogCommentsDto, ListBloCommentsDtos } from '../../../../dtos/blog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ToDatePipe } from '../../../../utils/to-date.pipe';


@Component({
  selector: 'app-blog-detail-comment',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSidenavModule, ToDatePipe,MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './blog-detail-comment.component.html',
  styleUrl: './blog-detail-comment.component.css'
})
export class BlogDetailCommentComponent implements OnInit, OnChanges {
  @Input() blogId!: number;

  blogComments!: ListBloCommentsDtos;
  showFiller = false;
  @Input() isDrawerOpen = false;
  @ViewChild('sidenav') sidenav?: MatSidenav;

  addCommentValue: string = '';
@Output() drawerOpenEvent :EventEmitter<boolean>=new EventEmitter<boolean>();

  request: GetBlogCommentsDto = {
    blogId: this.blogId,
    page: 1,
    pageSize: 40,
    orderBy: true
  };


  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private renderer: Renderer2,
  ) {

  }

  ngOnChanges(changes: any): void {
    debugger
    this.isDrawerOpen = changes['isDrawerOpen'].currentValue;
    if (this.isDrawerOpen
    ) {
      // this.renderer.setStyle(document.body, 'opacity', '0.2');
      this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
      this.sidenav?.open();


    }
    else {
      this.renderer.setStyle(document.body, 'overflow-y', 'auto');

      debugger
      this.sidenav?.close();
    }
  }

  ngOnInit(): void {
    debugger
    if (this.blogId) {
      this.getBlogComments(this.request);
    }
  }

  getBlogComments(request: GetBlogCommentsDto) {
    this.request.blogId=this.blogId;
    this.blogService.getBlogComments(request).subscribe({
      next: (res) => {
        this.blogComments = res;
      }
    })
  }

  addComment(addComment: string) {
    let commentRequest: CreateBlogCommentDto = {
      blogId: this.blogId,
      commentTitle: this.blogId.toString(),
      commentContent: addComment,
      publishDate: new Date(),
      isPublished: true
    };

    this.blogService.createBlogComment(commentRequest).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.getBlogComments(this.request);
        }
      }
    });
  }


  closeSidenav(){
    debugger
    this.renderer.setStyle(document.body, 'overflow-y', 'auto');

    this.isDrawerOpen=!this.isDrawerOpen;
    this.drawerOpenEvent.emit(this.isDrawerOpen)
  }
}
