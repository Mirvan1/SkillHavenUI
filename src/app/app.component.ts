import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SkillerCardComponent } from './components/skiller-card/skiller-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { ChatHubService } from './services/chat-hub.service';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { EditProfileDialogComponent } from './components/edit-profile-dialog/edit-profile-dialog.component';
import { UserService } from './services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatBadgeModule} from '@angular/material/badge';
import { DeviceService } from './services/device.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatBadgeModule,RouterLink,RouterOutlet,ChatDialogComponent,EditProfileDialogComponent,
     MatDialogActions,MatFormFieldModule,MatToolbarModule,MatIconModule,MatButtonModule, MatMenuModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skill-haven-ui';

badgeVisibility=false;

constructor(
  public router:Router,
  public editProfileDialog: MatDialog,
  public chatDialog: MatDialog,
  public chatHubService:ChatHubService,
  public userService:UserService,
  public toastrService:ToastrService
  ){
  this.chatHubService.newMessage$.subscribe({
    next:(res)=>{
      debugger
      if(res){
        this.badgeVisibility=res;
      }
    }
  })
}
 



openEditProfile(){
  const dialogRef = this.editProfileDialog.open(EditProfileDialogComponent, {restoreFocus: false,width:'60%',height:'90%'});
 // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
});
}

openChatDialog() {
  const chatDialogRef = this.chatDialog.open(ChatDialogComponent,{restoreFocus: false,width:'60%',height:'90%'});

  chatDialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

goEditBlogPage=()=>this.router.navigate(['/add-blog']);

logout=()=>{
  this.userService.logout();
  this.router.navigateByUrl('/login');
}

badgeVisible(){

  this.badgeVisibility=false;
}
}
