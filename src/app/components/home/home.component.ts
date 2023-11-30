import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SkillsService } from '../../services/skills.service';
import { ListSkillerDtos } from '../../dtos/skills';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../dtos/user.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  allSkillers:ListSkillerDtos | null = null;
  supervisors?:ListSkillerDtos | null;
  consultants?:ListSkillerDtos | null;
  user?:UserDto | null;
  constructor(
    private userService:UserService,
    private skillsService:SkillsService
  ){}


  ngOnInit(): void {
    this.getUser();
    this.getAllSkiller();
    this.getConsultants();
    this.getSupervisors();
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
    this.skillsService.getAllSkillers$.subscribe({
      next:(res)=>{
        if(res){
          this.allSkillers=res;
        }
      },
      error:(err)=>alert(err)
    });
  }

  getSupervisors(){
    this.skillsService.getSupervisors$.subscribe({
      next:(res)=>{
        if(res){
          this.supervisors=res;
        }
      },
      error:(err)=>alert(err)
    });
  }

  getConsultants(){
    this.skillsService.getConsultants$.subscribe({
      next:(res)=>{
        if(res){
          this.consultants=res;
        }
      },
      error:(err)=>alert(err)
    });
  }
  }