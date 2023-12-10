import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  title: string;
  userId!: number;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private userService:UserService,
    private router:Router
    ) {
    // Update view with given values
    this.title = data.title;
    this.userId = data.userId;
  }
 
  onConfirm(): void {
    
    this.userService.deleteUser(this.userId).subscribe({
      next:(res)=>{
        if(res){
          console.log("user deleted");
          this.router.navigateByUrl('/login');
        }
      },
      error:(err)=>{
        alert(JSON.stringify(err));
      }
    })
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {

  constructor(public title: string, public userId: number) {
  }
}