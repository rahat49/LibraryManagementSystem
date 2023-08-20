import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  
  sideNavContent : SideNavItem[]=[
    {
      title:'view books',
      link: 'books/library'
    },
    {
      title:'manage books',
      link: 'books/manage-book'
    },
    {
      title:'manage categories',
      link: 'books/manage-categories'
    },
    {
      title:'return book',
      link: 'books/return-book'
    },
    {
      title:'view users',
      link: 'users/users-list'
    },
    {
      title:'all orders',
      link: 'users/all-orders'
    },
    {
      title:'My orders',
      link: 'users/order'
    },

  ];
}
