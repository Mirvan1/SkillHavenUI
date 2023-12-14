import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-skiller-card-toolbar',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, FormsModule,MatIconModule],
  templateUrl: './skiller-card-toolbar.component.html',
  styleUrl: './skiller-card-toolbar.component.css'
})
export class SkillerCardToolbarComponent {
  searchValue?:string;
  @Output() searchEmitter:EventEmitter<string>=new EventEmitter<string>();

  search(){
    this.searchEmitter?.emit(this.searchValue);
  }
}
