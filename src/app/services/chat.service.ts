import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChatMessagesResponse, GetChatUserDto, GetMessagesByUser, ListChatMessagesDtos, ListChatUsersDtos } from '../dtos/chat.dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PaginatedRequest } from '../dtos/skills';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatEndpoint: string = `${environment.apiUrl}/chat`;

  messageSubject = new BehaviorSubject<ListChatMessagesDtos | null>(null);
  message$ = this.messageSubject.asObservable();
  public profileMessage$ = new Observable<ListChatMessagesDtos|null>();

  constructor(private httpClient: HttpClient) { }

  getMessagesByUser(request: GetMessagesByUser): Observable<ChatMessagesResponse> {
    let params = new HttpParams()
      .set('Page', request.page || '')
      .set('PageSize', request.pageSize || '')
      .set('OrderBy', request.orderBy || '')
      .set('ReceiverUserId', request.receiverUserId || '');

    return this.httpClient.get<ChatMessagesResponse>(`${this.chatEndpoint}/GetMessageByUser`, { params }).pipe(
      tap((res) => {
        if (res) {
          this.messageSubject.next(res);
        }
      })
    )
  }

  getAllChatUser(request: PaginatedRequest): Observable<ListChatUsersDtos> {
    let params = new HttpParams()
      .set('Page', request.page || '')
      .set('PageSize', request.pageSize || '')
      .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListChatUsersDtos>(`${this.chatEndpoint}/GetAllChatUser`, { params })
  }

  getOnlineUsers(request: PaginatedRequest): Observable<ListChatUsersDtos> {
    let params = new HttpParams()
      .set('Page', request.page || '')
      .set('PageSize', request.pageSize || '')
      .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListChatUsersDtos>(this.chatEndpoint, { params })
  }

  getChatUser(id: number): Observable<GetChatUserDto> {
    return this.httpClient.get<GetChatUserDto>(`${this.chatEndpoint}/${id}`);
  }

}
