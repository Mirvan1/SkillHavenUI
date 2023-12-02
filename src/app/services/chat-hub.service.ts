import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat-hub`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public addReceiveMessageListener = (onMessageReceived: (userId: number, message: string) => void) => {
    this.hubConnection.on('ReceiveMessageToAll', (userId, message) => {
      onMessageReceived(userId, message);
    });
    this.hubConnection.on('ReceiveMessageToClient', (userId, message) => {
      onMessageReceived(userId, message);
    });
    // Add other listeners as needed
  }

  public sendMessageToAll = (messageContent: string) => {
    this.hubConnection.invoke('SendMessageToAll', messageContent)
      .catch(err => console.error(err));
  }

  public sendMessageToClient = (receiverId: number, messageContent: string) => {
    this.hubConnection.invoke('SendMessageToClient', receiverId, messageContent)
      .catch(err => console.error(err));
  }

}
