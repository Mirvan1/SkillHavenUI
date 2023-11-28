import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ListSkillerDtos, PaginatedRequest, SkillerDto, getAllSkillerDto } from '../dtos/skills';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skillsEndpoint:string=`${environment.apiUrl}/skills`;

  constructor(private httpClient:HttpClient) { }

  getAllSkillerQuery(request:getAllSkillerDto):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('SearchByName', request.searchByName || '')
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetAllSkiller`,{params});
  }


  getSupervisors(request:PaginatedRequest):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetSupervisors`,{params});
  }


  getConsultants(request:PaginatedRequest):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetAllSkiller`,{params});
  }


  
  getSkiller(id:number):Observable<SkillerDto>{
    return this.httpClient.get<SkillerDto>(`${this.skillsEndpoint}/${id}`);
  }

}
