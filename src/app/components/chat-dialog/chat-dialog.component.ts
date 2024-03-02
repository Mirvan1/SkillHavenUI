import { Component, Input, OnChanges, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GetMessagesByUser, ListChatMessagesDtos, ListChatUsersDtos } from '../../dtos/chat.dto';
import { ChatService } from '../../services/chat.service';
import { PaginatedRequest } from '../../dtos/skills';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserDto } from '../../dtos/user.dto';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, } from '@angular/forms';
import { ChatHubService } from '../../services/chat-hub.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorResult } from '../../utils/global.dto';
@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, MatDividerModule, MatDialogModule, MatCardModule, MatFormFieldModule, MatIconModule],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent implements OnInit {

  chatUsers!: ListChatUsersDtos;

  getUserMessage$!: Observable<ListChatMessagesDtos | null>;
  receiverUserId!: number;
  receiverUsername!: string;
  receiverStatus!: string;
  loggedUser!: UserDto | null;
  messageInput: string = '';


  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private chatHub: ChatHubService,
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private toastr: ToastrService
  ) {

    if (data) {
      this.receiverUserId = data.userId;
      this.receiverUsername = data.fullName
    }
    this.userService.getUser$.subscribe(res => { this.loggedUser = res });

    // 
    // if (this.chatService.profileMessage$) {
    //   this.getUserMessage$ = this.chatService.profileMessage$;
    // } else {
    //   this.getUserMessage$ = this.chatService.message$;
    // }

    this.getUserMessage$ = this.chatService.message$;

    this.getUserMessage$.subscribe({
      next: (res) => {


      },
      error: (err) => {

      }
    })
  }

  ngOnInit(): void {
    let request: PaginatedRequest = {
      page: 1,
      pageSize: 100,
      orderBy: true,
    };
    this.chatService.getAllChatUser(request).subscribe({
      next: (res) => {
        if (res) {
          this.chatUsers = res;
        }
      }
    });


    this.chatHub.addReceiveMessageListener((userId, message) => {
      //if(userId===this.receiverUserId){

      this.toastr.success("receiver Fired", userId.toString());
      this.chatHub.loadChatHistory(this.receiverUserId);
      //        }
      //  }
    });

    this.chatHub.addSenderMessageListener((userId, message) => {
      //if(userId===this.loggedUser?.userId!){

      this.toastr.success("sender Fired", userId.toString());
console.log("Sender userid",this.loggedUser?.userId!)
      //  this.chatHub.loadChatHistory(this.receiverUserId);
      this.chatHub.loadChatHistory(this.loggedUser?.userId!);
      //    }
    });

  }

  GetUserMesssage(userId: number) {
    let messsages: GetMessagesByUser = {
      page: 1,
      pageSize: 100,
      orderBy: true,
      receiverUserId: userId
    };

    this.chatService.getMessagesByUser(messsages).subscribe({
      next: (res) => {
        this.receiverUserId = userId;
        this.receiverUsername = res.receiverUsername;// res.data.find(x=>x.receiverUserId === this.receiverUserId)?.receiverUsername!;

        this.receiverStatus = res.data.find(x => x.receiverUserId === this.receiverUserId)?.receiverStatus!;

        //

      }
    });
  }


  async sendMessageToUser(event: Event, userId: number, message: string) {
    event.preventDefault();



    await this.chatHub.sendMessageToClient(userId, message)
      .then(() => {
        this.chatHub.loadChatHistory(userId);
      })
      .catch((err: ErrorResult) => {
        this.chatHub.loadChatHistory(userId);
        this.chatHub.loadChatHistory(this.loggedUser?.userId!)

        // this.toastr.error(err.Message,`Failed with ${err.StatusCode}`)
      });

  }

}
