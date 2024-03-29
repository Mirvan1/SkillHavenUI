import { Component,  Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ListSkillerDtos, Role } from '../../dtos/skills';
import {  MatDividerModule } from '@angular/material/divider';
import {  MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SkillerDetailDialogComponent } from '../skiller-detail-dialog/skiller-detail-dialog.component';
import { NgxStarsModule } from 'ngx-stars';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-skiller-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatPaginatorModule, SkillerCardComponent, NgxStarsModule, MatCardModule, MatDividerModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './skiller-card.component.html',
  styleUrl: './skiller-card.component.css'
})
export class SkillerCardComponent {
  @Input() skillerList!: ListSkillerDtos;
  @Input() pageSize: number = 7;
  @Input() page: number = 1;
  // @Output() pageChanged: EventEmitter<any>=new EventEmitter<any>();

  role = Role;
  constructor(
    public detailDialog: MatDialog,
    public chatDialog: MatDialog,
  ) { }


  getDataDetail(userId: number) {
    this.detailDialog.open(SkillerDetailDialogComponent, {
      data: userId,
      restoreFocus: false, width: '60%', height: '90%'
    });
  }

  openChatDialog(userId: number, fullName: string) {
    const chatDialogRef = this.chatDialog.open(ChatDialogComponent, {
      data: { userId: userId, fullName: fullName },
      restoreFocus: false,
      width: '60%',
      height: '90%'
    });

    chatDialogRef.afterClosed().subscribe(result => {

    });
  }

  // pagination($e: any) {
  //   
  //   this.pageChanged.emit($e);
  // }


}
