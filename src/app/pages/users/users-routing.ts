import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

export const usersRoutes: Routes = [
  {
    path: "",
    component: ListUsersComponent,
    
  },
  {
    path: "add",
    component: AddUserComponent
  },
  {
    path:"update/:id/:firstName/:lastName",
    component:UpdateUserComponent,
    canDeactivate:[CanDeactivateGuard]
  }
];
