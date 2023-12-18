import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  ChangePasswordDto, LoginUserDto, RegisterUserDto, UserDto, VerifyUserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userEndpoint:string=`${environment.apiUrl}/user`;

  private accessToken = new BehaviorSubject<string>('');
  getAccessToken$ = this.accessToken.asObservable();

  private getUserInfos =new BehaviorSubject<UserDto|null>(null);
  getUser$=this.getUserInfos.asObservable();

  constructor(private httpClient:HttpClient) {
   
   }

  getUser():Observable<UserDto>{
    console.log("---------");
    
    return this.httpClient.get<UserDto>(`${this.userEndpoint}/get-logged-user`)
    .pipe(
      tap(res=>{
        console.log("GetUawe",res);
        
        this.getUserInfos.next(res)})
    );
  }

  registerUser(request:RegisterUserDto):Observable<number>{
   return  this.httpClient.post<number>(`${this.userEndpoint}/register`,request);
  }

  updateUser(request:UserDto):Observable<boolean>{
    return this.httpClient.put<boolean>(`${this.userEndpoint}`,request);
  }


  changeUserPassword(request:ChangePasswordDto):Observable<boolean>{
    return this.httpClient.patch<boolean>(`${this.userEndpoint}/change-password`,request);
  }

  deleteUser(id:number):Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.userEndpoint}/${id}`);
  }

  login(request:LoginUserDto):Observable<string>{
    return this.httpClient.post(`${this.userEndpoint}/login`,request, {responseType: 'text'})
    .pipe(
      tap(res=>{
        this.accessToken.next(res)
      })
    );
  }

  verifyUser(request:VerifyUserDto):Observable<boolean>{
    return this.httpClient.post<boolean>('http://localhost:5095/api/User/verify-user',request);
  }

  logout(){
    this.accessToken.next('');
    this.getUserInfos.next(null);
  }

}
