import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SkillsService } from '../../services/skills.service';
import { ListSkillerDtos, PaginatedRequest, SortResultDto, getAllSkillerDto } from '../../dtos/skills';
import { UserDto } from '../../dtos/user.dto';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SkillerCardComponent } from '../skiller-card/skiller-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ChatHubService } from '../../services/chat-hub.service';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SkillerCardToolbarComponent } from '../skiller-card-toolbar/skiller-card-toolbar.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, SkillerCardToolbarComponent, InfiniteScrollModule, RouterModule, BlogCarouselComponent, MatTabsModule, SkillerCardComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  allSkillers: ListSkillerDtos | null = null;
  supervisors?: ListSkillerDtos | null;
  consultants?: ListSkillerDtos | null;
  user?: UserDto | null;
  defaultPageSize: number = 8;
  defaultPage: number = 1;
  defaultSearchValue: string = '';
  defaultOrderBy: boolean = true;
  defaultOrderByName: string = 'Rating';

  activeTab = 0;
  constructor(
    private userService: UserService,
    private skillsService: SkillsService,
    public chatHubService: ChatHubService,
    private toastrService: ToastrService
  ) {
    this.userService.getUser().subscribe({});
    this.chatHubService.startConnection();

  }


  ngAfterViewInit() {
    this.chatHubService.addReceiveMessageListener((userId, message) => {
      // if(this.receiverUserId){
      // this.chatHubService.loadChatHistory(this.receiverUserId);
      // }
      this.toastrService.success(JSON.stringify(userId), JSON.stringify(message));
      this.chatHubService.newMessage.next(true);

    });
  }

  ngOnInit(): void {
    this.getAllSkiller(this.defaultPageSize, this.defaultPage, this.defaultSearchValue, this.defaultOrderBy, this.defaultOrderByName);
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
      // error: (err) => alert(err)
    })
  }


  getAllSkiller(defaultPageSize: number, defaultPage: number, defaultSearchValue: string, defaultOrderBy: boolean, defaultOrderByName: string) {
    let request: getAllSkillerDto = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: defaultOrderBy,
      orderByPropertname: defaultOrderByName,
      filter: defaultSearchValue
    };

    this.skillsService.getAllSkillerQuery(request).subscribe({
      next: (res) => {
        if (res) {
          this.allSkillers = res;
        }
      },
      // error: (err) => alert(JSON.stringify(err))
    });
  }

  getSupervisors(defaultPageSize: number, defaultPage: number, defaultSearchValue: string, defaultOrderBy: boolean, defaultOrderByName: string) {
    let request: PaginatedRequest = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: defaultOrderBy,
      orderByPropertname: defaultOrderByName,
      filter: defaultSearchValue

    };
    this.skillsService.getSupervisors(request).subscribe({
      next: (res) => {
        if (res) {
          this.supervisors = res;
        }
      },
      //error: (err) => alert(err)
    });
  }

  getConsultants(defaultPageSize: number, defaultPage: number, defaultSearchValue: string, defaultOrderBy: boolean, defaultOrderByName: string) {
    let request: PaginatedRequest = {
      page: defaultPage,
      pageSize: defaultPageSize,
      orderBy: defaultOrderBy,
      orderByPropertname: defaultOrderByName,
      filter: defaultSearchValue
    };

    this.skillsService.getConsultants(request).subscribe({
      next: (res) => {
        if (res) {
          this.consultants = res;
        }
      },
      //error: (err) => alert(JSON.stringify(err))
    });
  }


  onTabChange(index: number) {
    if (this.activeTab !== index) this.defaultSearchValue = '';

    this.activeTab = index;
    //   this.defaultPageSize=8;
    // this.defaultPage=1;

    if (this.activeTab === 0) {
      this.getAllSkiller(this.defaultPageSize, this.defaultPage, this.defaultSearchValue, this.defaultOrderBy, this.defaultOrderByName);
    }
    else if (this.activeTab === 1) {


      this.getConsultants(this.defaultPageSize, this.defaultPage, this.defaultSearchValue, this.defaultOrderBy, this.defaultOrderByName);
    }
    else if (this.activeTab === 2) {
      this.getSupervisors(this.defaultPageSize, this.defaultPage, this.defaultSearchValue, this.defaultOrderBy, this.defaultOrderByName);
    }
  }

  // allSkillerChanged($e: any) {
  //   
  //   this.defaultPageSize = $e.pageSize;
  //   //this.defaultPage=$e.pageIndex+1;
  //   this.getAllSkiller(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);
  //   
  // }

  // getSupervisorsChanged($e: any) {
  //   this.defaultPageSize = $e.pageSize;
  //   //this.defaultPage = $e.pageIndex + 1;
  //   this.getSupervisors(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);

  // }

  // getConsultantsChanged($e: any) {
  //   this.defaultPageSize = $e.pageSize;
  //   //this.defaultPage = $e.pageIndex + 1;
  //   this.getConsultants(this.defaultPageSize, this.defaultPage,this.defaultSearchValue);

  // }

  onScroll = () => {

    this.defaultPageSize += this.defaultPageSize;
    this.onTabChange(this.activeTab);
  }

  setSearchVal($e: string) {

    if ($e) {
      this.defaultSearchValue = $e;
      this.onTabChange(this.activeTab);

    }
  }
  setSortVal($e: SortResultDto) {


    this.defaultOrderBy = $e.orderBy!;


    this.defaultOrderByName = $e.column!;
    this.onTabChange(this.activeTab);

  }


}