import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogService } from '../../services/blog.service';
import { PaginatedRequest } from '../../dtos/skills';
import { ListBlogDtos } from '../../dtos/blog';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { JsonHubProtocol } from '@microsoft/signalr';
import { ShortStrPipe } from '../../utils/short-str.pipe';
import { ToastrService } from 'ngx-toastr';
import { ErrorResult } from '../../utils/global.dto';

@Component({
  selector: 'app-blog-carousel',
  standalone: true,
  imports: [CommonModule,RouterLink,CarouselModule,NgFor,ShortStrPipe ],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselComponent  implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    autoplay:true,
    touchDrag: false,
    center:true,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    nav:false,
    //navText: ['&#8249', '&#8250;'],
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
   request:PaginatedRequest={
    page:1,
    pageSize:10,
    orderBy:true,
    orderByPropertname:'PublishDate'
  };
  blogContent!:ListBlogDtos;
  constructor(
    private blogService:BlogService,
    private router:Router,
    private toastrService:ToastrService
    ){ }

  ngOnInit(): void {

    this.blogService.getBlogs(this.request).subscribe({
      next:(res)=>{
        if(res){
          res.data.forEach((x)=>{
            if(!x.photoPath || x.photoPath === undefined || x.photoPath === null){
              x.photoPath='./././assets/carousel-no-content.png';
            }
          })
            this.blogContent=res;
        }
      }    
    })
  }

  getBlogFromCarousel(blogId:number){
     
    this.router.navigate(['blog-detail',blogId]);
  }

}
