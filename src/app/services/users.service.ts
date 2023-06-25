import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpUsersListResponse, newUser } from '../types/users.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public perPage = 6;

  constructor(protected http: HttpClient,private router:Router) { }

  getUsers(page: number): Observable<HttpUsersListResponse> {
    return (this.http.get(`${environment.apiLink}/users?delay=1&page=${page}&per_page=${this.perPage}`)) as Observable<HttpUsersListResponse>;
  }
  
  setUser(user:newUser){
    //if u dont add { observe: 'response' } u wont be able to find the (status) property 
    this.http.post(`${environment.apiLink}/users`,user,{ observe: 'response' }).subscribe(
      (response)=>
      {
        //consoling 201 if sucess
        console.log("succesful",response.status);
        alert("user added succefully")
        this.router.navigate(['/admin/users']);
      },
      error=>console.log(error)
      )
  }

  updateUser(updatedUser:newUser,userId:number){
    this.http.put(`${environment.apiLink}/users/${userId}`,updatedUser,{observe:"response"}).subscribe(
      (response)=>{
         //consoling 201 if sucess
         console.log("succesful",response.status);
         alert("user updated succefully")
         this.router.navigate(['/admin/users']);
      },
      error=>console.log(error)
      )
  }
  isLoggedIn():boolean{
    let login = localStorage.getItem('login-key')
    if(login){
      console.log(login)
      return true 
    }else{
      return false
    }
  }

  loging(email:string,password:string){
    this.http.post(`${environment.apiLink}/users`,[email,password],{observe:'response'}).subscribe(
      ()=>{
        localStorage.setItem("login-key",(Math.random() + 1).toString(20).substring(2))
        this.router.navigate(['/admin'])
      }
    )
  }
}

