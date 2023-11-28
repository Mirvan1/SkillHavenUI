import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  ChangePasswordDto, LoginUserDto, UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEndpoint:string=`${environment.apiUrl}/user`;

  constructor(private httpClient:HttpClient) { }

  getUser(id:number):Observable<UserDto>{
    return this.httpClient.get<UserDto>(`${this.userEndpoint}/${id}`);
  }

  registerUser(request:UserDto):Observable<boolean>{
   return  this.httpClient.post<boolean>(`${this.userEndpoint}`,request);
  }

  updateUser(request:UserDto):Observable<boolean>{
    return this.httpClient.put<boolean>(`${this.userEndpoint}/register`,request);
  }


  changeUserPassword(request:ChangePasswordDto):Observable<boolean>{
    return this.httpClient.patch<boolean>(`${this.userEndpoint}/change-password`,request);
  }

  deleteUser(id:number):Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.userEndpoint}/${id}`);
  }

  login(request:LoginUserDto):Observable<string>{
    return this.httpClient.post<string>(`${this.userEndpoint}/login`,request);
  }



}
