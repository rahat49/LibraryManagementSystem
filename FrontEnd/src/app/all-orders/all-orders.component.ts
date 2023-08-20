import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  listOfOrders: Order[]=[];
  ordersToDisplay: Order[]=[];
  columns: string[]=[
   'id',
   'userid',
   'name',
   'bookid',
   'book',
   'date',
   'returned'
  ];
 
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllOrders().subscribe({
     next:(res:Order[])=>{
       this.listOfOrders=res;
       this.ordersToDisplay= this.listOfOrders;
       },
       error:(err:any)=> console.log(err),
   });
   
  }

  filter(value: string){
    if(value==='alt'){
      this.ordersToDisplay=this.listOfOrders.filter((value) => value);
    }else if(value==='pen'){
      this.ordersToDisplay=this.listOfOrders.filter(
        (value)=> value.returned==false
      );
    }else{
      this.ordersToDisplay=this.listOfOrders.filter(
        (value)=> value.returned
      );
    }
  }


}
