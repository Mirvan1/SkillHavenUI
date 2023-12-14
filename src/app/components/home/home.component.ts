import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SkillsService } from '../../services/skills.service';
import { ListSkillerDtos, PaginatedRequest, getAllSkillerDto } from '../../dtos/skills';
import { UserDto } from '../../dtos/user.dto';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SkillerCardComponent } from '../skiller-card/skiller-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SkillerCardToolbarComponent } from '../skiller-card-toolbar/skiller-card-toolbar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, SkillerCardToolbarComponent, InfiniteScrollModule, RouterModule, BlogCarouselComponent, MatTabsModule, SkillerCardComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allSkillers: ListSkillerDtos | null = null;
  supervisors?: ListSkillerDtos | null;
  consultants?: ListSkillerDtos | null;
  user?: UserDto | null;
  defaultPageSize: number = 8;
  defaultPage: number = 1;
  defaultSearchValue: string = '';

  activeTab = 0;
  constructor(
    private userService: UserService,
    private skillsService: SkillsService,
    public chatHubService: ChatHubService
  ) {
    this.userService.getUser().subscribe({});
    this.chatHubService.startConnection();
  }


  ngOnInit(): void {
    this.getAllSkiller(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
    //this.getConsultants();
    //this.getSupervisors();
  }

  getUser() {
    this.userService.getUser$.subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
        }
      },
      error: (err) => alert(err)
    })
  }


  getAllSkiller(defaultPageSize: number, defaultPage: number, defaultSearchValue: string) {
    let request: getAllSkillerDto = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: true,
      orderByPropertname: 'Rating',
      filter: defaultSearchValue
    };
    console.log(request)
    this.skillsService.getAllSkillerQuery(request).subscribe({
      next: (res) => {
        if (res) {
          this.allSkillers = res;
        }
      },
      error: (err) => alert(JSON.stringify(err))
    });
  }

  getSupervisors(defaultPageSize: number, defaultPage: number, defaultSearchValue: string) {
    let request: PaginatedRequest = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: true,
      filter: defaultSearchValue

    };
    this.skillsService.getSupervisors(request).subscribe({
      next: (res) => {
        if (res) {
          this.supervisors = res;
        }
      },
      error: (err) => alert(err)
    });
  }

  getConsultants(defaultPageSize: number, defaultPage: number, defaultSearchValue: string) {
    let request: PaginatedRequest = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: true,
      filter: defaultSearchValue
    };
    this.skillsService.getConsultants(request).subscribe({
      next: (res) => {
        if (res) {
          this.consultants = res;
        }
      },
      error: (err) => alert(JSON.stringify(err))
    });
  }


  onTabChange(index: number) {
    if(this.activeTab !==index) this.defaultSearchValue='';
    
    this.activeTab = index;
    //   this.defaultPageSize=8;
    // this.defaultPage=1;
  
    if (this.activeTab === 0) {
      this.getAllSkiller(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
    }
    else if (this.activeTab === 1) {
      this.getConsultants(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
    }
    else if (this.activeTab === 2) {
      this.getSupervisors(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
    }
  }

  allSkillerChanged($e: any) {
    debugger
    this.defaultPageSize = $e.pageSize;
    //this.defaultPage=$e.pageIndex+1;
    this.getAllSkiller(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
    console.log("allskiller", $e);
  }

  getSupervisorsChanged($e: any) {
    this.defaultPageSize = $e.pageSize;
    this.defaultPage = $e.pageIndex + 1;
    this.getSupervisors(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);

  }

  getConsultantsChanged($e: any) {
    this.defaultPageSize = $e.pageSize;
    this.defaultPage = $e.pageIndex + 1;
    this.getConsultants(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);

  }

  onScroll = () => {
    debugger
    this.defaultPageSize += this.defaultPageSize;
    this.onTabChange(this.activeTab);
  }

  setSearchVal($e: string) {
    debugger
    if ( $e) {
      this.defaultSearchValue = $e;
      this.onTabChange(this.activeTab);

    }
  }

}