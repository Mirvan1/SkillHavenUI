import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetChatUserDto, ListChatUsersDtos } from '../dtos/chat.dto';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../dtos/skills';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatEndpoint:string=`${environment.apiUrl}/blogs`;
   
  constructor(private httpClient:HttpClient) { }

  getMessagesByUser(id:number):Observable<ListChatUsersDtos>{
    return this.httpClient.get<ListChatUsersDtos>(`${this.chatEndpoint}/{id}`)
  }

  getAllChatUser(request:PaginatedRequest):Observable<ListChatUsersDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');
    
    return this.httpClient.get<ListChatUsersDtos>(this.chatEndpoint,{params})
  }

  getOnlineUsers(request:PaginatedRequest):Observable<ListChatUsersDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');
    
    return this.httpClient.get<ListChatUsersDtos>(this.chatEndpoint,{params})
  }

  getChatUser(id:number):Observable<GetChatUserDto>{
    return this.httpClient.get<GetChatUserDto>(`${this.chatEndpoint}/${id}`);
  }

}
