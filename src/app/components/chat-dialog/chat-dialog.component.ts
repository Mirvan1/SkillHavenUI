import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { GetMessagesByUser,  ListChatMessagesDtos, ListChatUsersDtos } from '../../dtos/chat.dto';
import { ChatService } from '../../services/chat.service';
import { PaginatedRequest } from '../../dtos/skills';
import { UserService } from '../../services/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider'
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { UserDto } from '../../dtos/user.dto';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatHubService } from '../../services/chat-hub.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [CommonModule,MatInputModule,FormsModule ,MatButtonModule, MatDividerModule,MatDialogModule,MatCardModule,MatFormFieldModule,MatIconModule],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent implements OnInit {

   chatUsers!:ListChatUsersDtos;

   getUserMessage$!:Observable<ListChatMessagesDtos | null>;
   receiverUserId!:number;
   receiverUsername!:string;
   receiverStatus!:string;
   loggedUser!:UserDto|null;
   messageInput:string='';


   constructor(
    private chatService:ChatService,
    private userService:UserService,
    private chatHub:ChatHubService,
    public dialogRef: MatDialogRef<ChatDialogComponent>

   ){
    this.userService.getUser$.subscribe(res=>{this.loggedUser=res});
    this.getUserMessage$ = this.chatService.message$;
  }

  ngOnInit(): void {
    let request:PaginatedRequest={
      page:1,
      pageSize:10,
      orderBy:true,
    };
    this.chatService.getAllChatUser(request).subscribe({
      next:(res)=>{
        if(res){
          this.chatUsers=res;
        }
      },
      error:(err)=>alert(JSON.stringify(err))
    });



    this.chatHub.addReceiveMessageListener((userId, message) => { 
        if(this.receiverUserId){
        this.chatHub.loadChatHistory(this.receiverUserId);
        }
    });

  }

  GetUserMesssage(userId:number){
    let messsages:GetMessagesByUser={
      page:1,
      pageSize:100,
      orderBy:true,
      receiverUserId:userId
    };

    this.chatService.getMessagesByUser(messsages).subscribe({
      next:(res)=>{
       this.receiverUserId=userId;
       this.receiverUsername = res.data.find(x=>x.receiverUserId === this.receiverUserId)?.receiverUsername!;
       this.receiverStatus= res.data.find(x=>x.receiverUserId === this.receiverUserId)?.receiverStatus!;
        //console.log('getUsermessage',this.getMessageByUser)
        
      },
      error:(err)=>alert(JSON.stringify(err))
    });
  }


  async sendMessageToUser(event:Event,userId:number,message:string){
    event.preventDefault();
    console.log("UserId",userId);
    console.log("Message,",message);

   await this.chatHub.sendMessageToClient(userId,message)
    .then(()=>{
      this.chatHub.loadChatHistory(userId);
    })
    .catch((err)=>alert(err));

  }

}
