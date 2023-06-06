import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {  newUser } from 'src/app/types/users.type';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

newUser:newUser={
  first_name: "",
    last_name: "",
    email: "",
    job:"",
    phone:0
};



  constructor(private usersService : UsersService){}

  onSubmitUser()
  {
    this.usersService.setUser(this.newUser);
  }
}
