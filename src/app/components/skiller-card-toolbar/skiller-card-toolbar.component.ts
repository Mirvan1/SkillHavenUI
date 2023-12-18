import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { SortResultDto } from '../../dtos/skills';

@Component({
  selector: 'app-skiller-card-toolbar',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatSlideToggleModule,MatRippleModule,MatSelectModule,MatMenuModule, MatInputModule, MatButtonModule,FormsModule,MatIconModule],
  templateUrl: './skiller-card-toolbar.component.html',
  styleUrl: './skiller-card-toolbar.component.css'
})
export class SkillerCardToolbarComponent {
  searchValue?:string;
  selectedSort?:string;
  orderBy:boolean=true;
  @Input() skillerSortingValues=[
    {value:'Rating',text:'Rate'},
    {value:'Experience',text:'Experience'}
  ]

  @Output() searchEmitter:EventEmitter<string>=new EventEmitter<string>();
 @Output() sortEmitter:EventEmitter<SortResultDto>=new EventEmitter<SortResultDto>();

  search(){
    this.searchEmitter?.emit(this.searchValue);
  }

  sort(){
    debugger
    let sortResult:SortResultDto={
      column:this.selectedSort,
      orderBy:this.orderBy
    };

    this.sortEmitter.emit(sortResult);
  }
}
