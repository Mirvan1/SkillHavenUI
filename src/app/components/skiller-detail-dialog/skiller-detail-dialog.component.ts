import { Component, Input, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { SkillerDto } from '../../dtos/skills';
import { SkillsService } from '../../services/skills.service';
import { Role } from '../../dtos/user.dto';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';
import { SkillerCardComponent } from '../skiller-card/skiller-card.component';
import { ChatService } from '../../services/chat.service';
import { GetMessagesByUser, ListChatMessagesDtos } from '../../dtos/chat.dto';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-skiller-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, NgxStarsModule, MatDividerModule, MatIconModule, BarRatingModule, MatFormFieldModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './skiller-detail-dialog.component.html',
  styleUrl: './skiller-detail-dialog.component.css'
})
export class SkillerDetailDialogComponent implements OnInit {
  @Input() userId!: number;
  skiller!: SkillerDto;
  role = Role;
  profileMessageSubject = new BehaviorSubject<ListChatMessagesDtos | null>(null);

  constructor(
    private skillerService: SkillsService,
    public dialogRef: MatDialogRef<SkillerDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private chatService: ChatService
  ) { }


  ngOnInit(): void {
    this.skillerService.getSkiller(this.data).subscribe({
      next: (res) => {
        this.skiller = res;
      }
    })
  }

  openSendMessage() {
    let request: GetMessagesByUser = {
      page: 1,
      pageSize: 100,
      orderBy: true,
      receiverUserId: this.userId
    };
    this.chatService.getMessagesByUser(request).subscribe({
      next:(res)=>{
        this.profileMessageSubject.next(res);
        this.chatService.message$=this.profileMessageSubject.asObservable();

      }
    })
  }


  convertFloat = (value: number) => parseFloat(value.toString())

}
