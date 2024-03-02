import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  ChangePasswordDto, ForgotPasswordDto, LoginUserDto, MailUserCheckerDto, RegisterUserDto, ResetPasswordDto, UserDto, VerifyUserDto } from '../dtos/user.dto';
import { environment } from '../../environments/environment.development';

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
   this.getSession();
   }

  getUser():Observable<UserDto>{
    
    
    return this.httpClient.get<UserDto>(`${this.userEndpoint}/get-logged-user`)
    .pipe(
      tap(res=>{
        
        
        if(!res){
          res=JSON.parse(localStorage.getItem('session')!) as UserDto;
        }
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
        
        if(!res){
          res=JSON.parse(localStorage.getItem('token')!) as string;
        }
        this.accessToken.next(res)
      })
    );
  }

  verifyUser(request:VerifyUserDto):Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.userEndpoint}/User/verify-user`,request);
  }

  forgotPassword(request:ForgotPasswordDto){
    return this.httpClient.post<boolean>(`${this.userEndpoint}/forgot-password`,request);
  }

  resetPassword(request:ResetPasswordDto){
    return this.httpClient.post<boolean>(`${this.userEndpoint}/reset-password`,request);
 
  }

  mailChecker(request:MailUserCheckerDto):Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.userEndpoint}/mail-checker`,request);
  }

  getCaptchaKey():Observable<string>{
    return this.httpClient.get(`${this.userEndpoint}/get-captcha-key`, {responseType: 'text'} ).pipe(shareReplay(1));
  }

  logout(){
    this.accessToken.next('');
    this.getUserInfos.next(null);
    localStorage.clear();
  }

  private getSession(){
    const accessToken=JSON.parse(localStorage.getItem('token')!) as string;
    const userDto=JSON.parse(localStorage.getItem('session')!) as UserDto;

    if(accessToken) this.accessToken.next(accessToken);
    if(userDto) this.getUserInfos.next(userDto);
  }



}
