import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { UsersModule } from './users/users.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { onlyLoggedInUsersGuardGuard } from '../guards/only-logged-in-users-guard.guard';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UsersModule,
    TranslateModule,
    FormsModule
  ],
  providers:[
    
  ]
})
export class PagesModule { }
   