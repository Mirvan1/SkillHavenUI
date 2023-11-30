import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateBlogCommentDto, CreateBlogDto, GetBlogCommentsDto, GetBlogDto, ListBloCommentsDtos, ListBlogDtos, UpdateBlogDto, VoteBlogDto } from '../dtos/blog';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../dtos/skills';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogEndpoint:string=`${environment.apiUrl}/blogs`;

  
  constructor(private httpClient:HttpClient) { }

  getBlogs(request:PaginatedRequest){
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    this.httpClient.get<ListBlogDtos>(this.blogEndpoint,{params});
  }
 
  getBlog(id:number):Observable<GetBlogDto>{
    return this.httpClient.get<GetBlogDto>(`${this.blogEndpoint}/${id}`);
  }

  getBlogComments(request:GetBlogCommentsDto):Observable<ListBloCommentsDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListBloCommentsDtos>(`${this.blogEndpoint}/`,{params});
  }

  createBlog(request:CreateBlogDto):Observable<boolean>{
    return this.httpClient.post<boolean>(this.blogEndpoint,request);
  }

  createBlogComment(request:CreateBlogCommentDto):Observable<boolean>{
   return this.httpClient.post<boolean>(`${this.blogEndpoint}/commment/create`,request);
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
    return this.httpClient.post<number>(`${this.blogEndpoint}/vote`,request);
  }
}
