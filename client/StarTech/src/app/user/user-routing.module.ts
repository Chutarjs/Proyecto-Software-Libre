import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAllComponent } from './user-all/user-all.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: 'user-table',
    component: UserAllComponent
  },
  {
    path: 'user/create',
    component: UserFormComponent
  },
  {
    path: 'user/update/:id',
    component: UserFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }