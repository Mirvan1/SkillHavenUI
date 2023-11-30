import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ListSkillerDtos, PaginatedRequest, SkillerDto, getAllSkillerDto } from '../dtos/skills';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skillsEndpoint:string=`${environment.apiUrl}/skills`;

  private getAllSkillersSubject=new BehaviorSubject<ListSkillerDtos | null>(null);
  getAllSkillers$=this.getAllSkillersSubject.asObservable();

  private getSupervisorsSubject=new BehaviorSubject<ListSkillerDtos | null>(null);
  getSupervisors$=this.getSupervisorsSubject.asObservable();

  private getConsultantsSubject=new BehaviorSubject<ListSkillerDtos | null>(null);
  getConsultants$=this.getConsultantsSubject.asObservable();


  constructor(private httpClient:HttpClient) { }

  getAllSkillerQuery(request:getAllSkillerDto):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('SearchByName', request.searchByName || '')
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetAllSkiller`,{params})
    .pipe(
      tap(res=>this.getAllSkillersSubject.next(res))
    );
  }


  getSupervisors(request:PaginatedRequest):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetSupervisors`,{params})
    .pipe(
      tap(res=>this.getSupervisorsSubject.next(res))
    );
  }


  getConsultants(request:PaginatedRequest):Observable<ListSkillerDtos>{
    let params = new HttpParams()
    .set('Page', request.page || '')
    .set('PageSize', request.pageSize || '')
    .set('OrderBy', request.orderBy || '');

    return this.httpClient.get<ListSkillerDtos>(`${this.skillsEndpoint}/GetAllSkiller`,{params})
    .pipe(
      tap(res=>this.getConsultantsSubject.next(res))
    );
  }


  
  getSkiller(id:number):Observable<SkillerDto>{
    return this.httpClient.get<SkillerDto>(`${this.skillsEndpoint}/${id}`);
  }

}
