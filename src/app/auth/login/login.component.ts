import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  email!:string;
  password!:string;

  constructor(private UsersService:UsersService){

  }

  ngOnInit() {
    this.loginForm=new FormGroup({
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password:new FormControl("",Validators.required)
    })
  }

  onSubmit(value :any) {
    this.email=value.email
    this.password =value.password
    this.UsersService.loging(this.email,this.password)
  }


}
