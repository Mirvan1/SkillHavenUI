import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ListChatUsersDtos } from '../../dtos/chat.dto';
import { ChatService } from '../../services/chat.service';
import { PaginatedRequest } from '../../dtos/skills';

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent implements OnInit {
   chatUsers!:ListChatUsersDtos;

   constructor(
    private chatService:ChatService
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



}
