import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/types/users.type';

@Component({
  selector: 'app-list',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  public loading = true;
  public activePage: number = 0;
  public users: UserType[] = [];
  public totalPages = 1;

  constructor(public usersService: UsersService,private router:Router) {}

  getUsers(page: number = 1): void {
    if (page >= 1 && page <= this.totalPages && this.activePage !== page) {
      this.loading = true;
      this.users = [];
      this.activePage = page;
      const users$ = this.usersService.getUsers(page);
      lastValueFrom(users$).then(response => {
        this.users = response?.data;
        this.totalPages = response?.total_pages;
        this.loading = false;
      }).catch(error => {
        this.users = [];
        this.totalPages = 1;
        this.loading = false;
      });
    }
  }

  updateUser(userId:number,firstName:string,lastName:string){
    this.router.navigate(['/admin/users/update',userId,firstName,lastName])
  }

  deleteUser(userId: number) {
    // TODO: Delete user action
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    
  }
}
