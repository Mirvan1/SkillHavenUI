import { Injectable, inject } from '@angular/core';
import { environment } from '../environment/environment';
import * as signalR from "@microsoft/signalr";
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { GetMessagesByUser } from '../dtos/chat.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  private hubConnection!: signalR.HubConnection;
  userService: UserService = inject(UserService);
  chatService: ChatService = inject(ChatService);
  accessToken!: string;

   newMessage = new BehaviorSubject<boolean>(false);
  newMessage$ = this.newMessage.asObservable();

  public startConnection = () => {
    this.userService.getAccessToken$.subscribe({
      next: (res) => {
        this.accessToken = res;
      }
    })


    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.socketUrl}/chatHub`, {
        accessTokenFactory: () => this.accessToken,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public addReceiveMessageListener = (onMessageReceived: (userId: number, message: string) => void) => {
    this.hubConnection.on('ReceiveMessageToAll', (userId, message) => {
      console.log("UserId and message",userId+message);
      
      onMessageReceived(userId, message);
    });
    this.hubConnection.on('ReceiveMessageToClient', (userId, message) => {
      console.log("UserId and message",userId+message);

      onMessageReceived(userId, message);
    });
  }

  public sendMessageToAll = (messageContent: string) => {
    this.hubConnection.invoke('SendMessageToAll', messageContent)
      .catch(err => console.error(err));
  }

  public sendMessageToClient(receiverId: number, messageContent: string): Promise<any> {
    return this.hubConnection.invoke('SendMessageToClient', receiverId, messageContent);
    //.catch(err => console.error(err));
  }



  loadChatHistory(receiverId:number) {
    this.userService.getUser$.subscribe(res => {
      if (res) {
        let request: GetMessagesByUser = {
          page: 1,
          pageSize: 100,
          orderBy: true,
          receiverUserId: receiverId
        };
        this.chatService.getMessagesByUser(request).subscribe({});
      }
    });
  }

}
