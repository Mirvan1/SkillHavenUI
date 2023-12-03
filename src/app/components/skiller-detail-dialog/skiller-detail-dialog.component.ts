import { Component, Input, OnInit ,Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatLabel,MatFormField, MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button';
import { SkillerDto } from '../../dtos/skills';
import { SkillsService } from '../../services/skills.service';
import { Role } from '../../dtos/user.dto';
import { BarRatingModule } from 'ngx-bar-rating';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';


@Component({
  selector: 'app-skiller-detail-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogTitle,NgxStarsModule,MatDividerModule,MatIconModule, BarRatingModule,MatFormFieldModule,MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './skiller-detail-dialog.component.html',
  styleUrl: './skiller-detail-dialog.component.css'
})
export class SkillerDetailDialogComponent implements OnInit {
  @Input() userId!:number;
  skiller!:SkillerDto;
  role=Role;

  constructor(
    private skillerService:SkillsService,
    public dialogRef: MatDialogRef<SkillerDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ){}


  ngOnInit(): void {
    
    console.log("dData",this.data)
    this.skillerService.getSkiller(this.data).subscribe({
      next:(res)=>{
        this.skiller=res;
      },
      error:(err)=>alert(err)
    })
  }

  convertFloat=(value:number)=>parseFloat(value.toString())

}
