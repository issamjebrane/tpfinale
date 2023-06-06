import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validator, Validators} from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit{

  updateForm!:FormGroup;
  id!:number;
  firstName!:string;
  lastName!:string;

  constructor(private route:ActivatedRoute, private usersService : UsersService){
   this.route.params.subscribe(
      params=>
      {
        this.id = params['id']
        this.firstName= params['firstName']
        this.lastName= params['lastName']
      }
    )
  }
  
  updateUser(){
    this.usersService.updateUser(this.updateForm.value,this.id);
  }

  ngOnInit(): void {
    this.updateForm=new FormGroup({
      firstname: new FormControl(this.firstName,Validators.required),
      lastname: new FormControl(this.lastName,Validators.required),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email
      ])),
      job:new FormControl(""),
      phone:new FormControl(""),
    })
  }
}
