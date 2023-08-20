import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { authenticationGuard } from './guards/authentication.guard';
import { OrderComponent } from './order/order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { authorizationGuard } from './authorization.guard';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ManageBookComponent } from './manage-book/manage-book.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes=[
    {
      path:'books/library',
      component: LibraryComponent,
      canActivate:[authenticationGuard]
    },
    {
      path:'login',
      component: LoginComponent,
    },
    {
      path:'register',
      component: RegisterComponent,
    },
    {
      path:'users/order',
      component: OrderComponent,
      canActivate:[authenticationGuard]
    },
    {
      path:'users/all-orders',
      component: AllOrdersComponent,
      canActivate:[authorizationGuard]
    },
    {
      path:'books/return-book',
      component: ReturnBookComponent,
      canActivate:[authenticationGuard]
    },
    {
      path:'users/users-list',
      component: UsersListComponent,
      canActivate:[authorizationGuard]
    },
  
    {
      path:'books/manage-book',
      component: ManageBookComponent,
      canActivate:[authorizationGuard]
    },
    {
      path:'books/manage-categories',
      component:ManageCategoriesComponent,
      canActivate:[authorizationGuard]
    },
    {
      path:'users/profile',
      component: ProfileComponent,
      canActivate:[authenticationGuard]
    },
    
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), 
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }



