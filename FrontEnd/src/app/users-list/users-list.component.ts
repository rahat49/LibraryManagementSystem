import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'createdon',
    'action',
  ];
  constructor(private api: ApiService) { }

   ngOnInit(): void {
    this.api.getAllUsers().subscribe((res: User[])=>
    {
      this.users=[];
      this.users=res;
        console.log(res);
    },
      (err:any)=>
    {
        console.log(err)
    });
  }

  blockUser(user:User){
    if(user.blocked){
      this.api.unblockUser(user.id).subscribe({
        next:(res:any)=>{
          if(res==='success')user.blocked=false;
        },
        error:(err:any)=> console.log(err),
      });
    }
    else{
      this.api.blockUser(user.id).subscribe({
        next:(res:any)=>{
          if(res==='success') user.blocked=true;
        },
        error:(err:any)=> console.log(err),
      })
    }
  }
  enableUser(user:User){
    if(user.active){
      this.api.disableUser(user.id).subscribe({
        next:(res:any)=>{
          if(res==='success')user.active=false;
        },
        error:(err:any)=> console.log(err),
      });
    }
    else{
      this.api.enableUser(user.id).subscribe({
        next:(res:any)=>{
          if(res==='success') user.active=true;
        },
        error:(err:any)=> console.log(err),
      })
    }
  }

 
  

}

