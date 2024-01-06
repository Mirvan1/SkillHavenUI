import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogPaginatedRequest, CreateBlogCommentDto, CreateBlogDto, GetBlogCommentsDto, GetBlogDto, GetBlogTopicDto, ListBloCommentsDtos, ListBlogDtos, ListGetBlogTopicDto, UpdateBlogDto, VoteBlogDto } from '../dtos/blog';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../dtos/skills';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogEndpoint:string=`${environment.apiUrl}/blog`;

  
  constructor(private httpClient:HttpClient) { }

  getBlogs(request:BlogPaginatedRequest):Observable<ListBlogDtos>{
    let params = new HttpParams()
    params= params.set('Page', request.page || '')
    params= params.set('PageSize', request.pageSize || '')
    params= params.set('OrderBy', String(request.orderBy) || '')
    params= params.set('OrderByPropertname', request.orderByPropertname || '');
    params=   params.set('BlogTopicId', request.blogTopicId || '');

    if(request.filter){
  params=  params.append('Filter', request.filter!   );
    };    ;
debugger;
console.log("Param",params) 
    return this.httpClient.get<ListBlogDtos>(this.blogEndpoint,{params});
  }
 
  getBlog(id:number):Observable<GetBlogDto>{
    return this.httpClient.get<GetBlogDto>(`${this.blogEndpoint}/${id}`);
  }

  getBlogComments(request:GetBlogCommentsDto):Observable<ListBloCommentsDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    // return this.httpClient.get<ListBloCommentsDtos>(`http://localhost:5095/comments/${request.blogId}`,{params});
    return this.httpClient.post<ListBloCommentsDtos>(`http://localhost:5095/comments/`,request);

  }

  createBlog(request:CreateBlogDto):Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.blogEndpoint}/`,request);
  }

  createBlogComment(request:CreateBlogCommentDto):Observable<boolean>{
   return this.httpClient.post<boolean>(`http://localhost:5095/commment/create`,request);
  }

  updateBlog(request:UpdateBlogDto):Observable<boolean>{
  return this.httpClient.put<boolean>(`${this.blogEndpoint}/`,request);
  }

  deleteBlogComment(id:number){
    return this.httpClient.delete(`${this.blogEndpoint}/comment/delete/${id}`);
  }

  deleteBlog(id:number){
    return this.httpClient.delete(`${this.blogEndpoint}/${id}`);
  }


  voteBlog(request:VoteBlogDto){
    return this.httpClient.put<number>(`http://localhost:5095/vote`,request);
  }

  getTopics(request:PaginatedRequest){
    let params = new HttpParams()
    params.set('Page', request.page || '')
    params.set('PageSize', request.pageSize || '')
    params.set('OrderBy', String(request.orderBy) || '')
    params.set('OrderByPropertname', request.orderByPropertname || '');
if(request.filter){
  params=  params.append('Filter', request.filter!   );
    };  

    return this.httpClient.get<ListGetBlogTopicDto>(`http://localhost:5095/topics`,{params});
  }
}
