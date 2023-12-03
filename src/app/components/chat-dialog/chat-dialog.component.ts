import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { GetMessagesByUser,  ListChatMessagesDtos, ListChatUsersDtos } from '../../dtos/chat.dto';
import { ChatService } from '../../services/chat.service';
import { PaginatedRequest } from '../../dtos/skills';
import { UserService } from '../../services/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider'
@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule,MatDialogModule,MatCardModule,MatIconModule],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent implements OnInit {
   chatUsers!:ListChatUsersDtos;
   getMessageByUser!:ListChatMessagesDtos;
   constructor(
    private chatService:ChatService,
    private userService:UserService
   ){}



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

  }

  GetUserMesssage(userId:number){
    let messsages:GetMessagesByUser={
      page:1,
      pageSize:10,
      orderBy:true,
      receiverUserId:userId
    }
    this.chatService.getMessagesByUser(messsages).subscribe({
      next:(res)=>{
        this.getMessageByUser=res;

        console.log('getUsermessage',this.getMessageByUser)
      },
      error:(err)=>alert(JSON.stringify(err))
    });
  }

}
