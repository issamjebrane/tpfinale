import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validator, Validators} from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit,CanComponentDeactivate{

  updateForm!:FormGroup;
  id!:number;
  firstName!:string;
  lastName!:string;
  isSaved:boolean=false;

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(event: BeforeUnloadEvent): void {
    this.isAllowedNavigation(true).subscribe(isAllowedNavigation => {
      if (event && !isAllowedNavigation) {
        event.preventDefault();
        event.returnValue = false;
      }
    });
  }

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
  canDeactivate(): Observable<boolean> {
    return this.isAllowedNavigation();
  }

  private isAllowedNavigation(beforeunloadEvent = false): Observable<boolean> {
    if (!this.isSaved || beforeunloadEvent) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }

    return of(true);
  }

  onSubmit() {
    this.isSaved = true;
  }
}
