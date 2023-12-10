import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SkillsService } from '../../services/skills.service';
import { ListSkillerDtos, PaginatedRequest, getAllSkillerDto } from '../../dtos/skills';
import { UserDto } from '../../dtos/user.dto';
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { SkillerCardComponent } from '../skiller-card/skiller-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { SkillerDetailDialogComponent } from '../skiller-detail-dialog/skiller-detail-dialog.component';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ChatHubService } from '../../services/chat-hub.service';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgFor,RouterModule,BlogCarouselComponent,MatTabsModule,SkillerCardComponent,MatToolbarModule,MatIconModule,MatButtonModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  allSkillers:ListSkillerDtos | null = null;
  supervisors?:ListSkillerDtos | null;
  consultants?:ListSkillerDtos | null;
  user?:UserDto | null;

  activeTab=0;
  constructor(
    private userService:UserService,
    private skillsService:SkillsService,
    public chatHubService:ChatHubService
      ){
    this.userService.getUser().subscribe({});
    this.chatHubService.startConnection();
  }


  ngOnInit(): void {
    this.getAllSkiller();
    //this.getConsultants();
    //this.getSupervisors();
  }

  getUser(){
    this.userService.getUser$.subscribe({
      next:(res)=>{
        if(res){
          this.user = res;
        }
      },
      error:(err)=>alert(err)
    })
  }


  getAllSkiller(){
    let request:getAllSkillerDto={
      page:1,
      pageSize:10,
      orderBy:true,
      orderByPropertname:'Rating',

    };
    console.log(request)
    this.skillsService.getAllSkillerQuery(request).subscribe({
      next:(res)=>{
        if(res){
          this.allSkillers=res;
        }
      },
      error:(err)=>alert(JSON.stringify(err))
    });
  }

  getSupervisors(){
    let request:PaginatedRequest={
      page:1,
      pageSize:10,
      orderBy:true

    };
    this.skillsService.getSupervisors(request).subscribe({
      next:(res)=>{
        if(res){
          this.supervisors=res;
        }
      },
      error:(err)=>alert(err)
    });
  }

  getConsultants(){
    let request:PaginatedRequest={
      page:1,
      pageSize:10,
      orderBy:true,

    };
    this.skillsService.getConsultants(request).subscribe({
      next:(res)=>{
        if(res){
          this.consultants=res;
        }
      },
      error:(err)=>alert(JSON.stringify(err))
    });
  }


  onTabChange(index:number){
    this.activeTab=index;
    if(this.activeTab === 0){
      this.getAllSkiller();
    }
    else if(this.activeTab === 1){
      this.getConsultants();
    }
    else if(this.activeTab === 2){
      this.getSupervisors();
    }
  }


 
  }