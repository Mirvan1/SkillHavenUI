import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ListSkillerDtos, Role } from '../../dtos/skills';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SkillerDetailDialogComponent } from '../skiller-detail-dialog/skiller-detail-dialog.component';
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
  selector: 'app-skiller-card',
  standalone: true,
  imports: [CommonModule,BarRatingModule,MatCardModule,MatDividerModule,MatProgressBarModule,MatButtonModule],
  templateUrl: './skiller-card.component.html',
  styleUrl: './skiller-card.component.css'
})
export class SkillerCardComponent {
  @Input() skillerList!:ListSkillerDtos;
  role=Role;
  constructor(    public detailDialog: MatDialog    ){}


  getDataDetail(userId:number){
    this.detailDialog.open(SkillerDetailDialogComponent, {
      data: userId,
      restoreFocus: false,width:'60%',height:'90%'
    });
  }
}
