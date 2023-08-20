import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, CategoryBook, Order, User, UserType } from '../models/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "https://localhost:7284/api/Library/";
  constructor(private http: HttpClient, private jwt: JwtHelperService) { }

  createAccount(user: User) {
    return this.http.post(this.baseUrl + 'CreateAccount', user, {
      responseType: 'text',
    });
  }

  login(loginInfo: any) {
    let params = new HttpParams()
      .append('email', loginInfo.email)
      .append('password', loginInfo.password);
    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  deleteToken() {

    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      email: token.email,
      mobile: token.mobile,
      password: '',
      blocked: token.blocked.toLowerCase() === 'true',
      active: token.active.toLowerCase() === 'true',
      createdOn: token.createdAt,
      fine: 0,
      userType: token.userType === 'USER' ? UserType.USER : UserType.ADMIN,
    };
    return user;
  }
  getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'GetAllBooks');
  }

  orderBook(userId: number, bookId: Number) {
    return this.http.get(this.baseUrl + 'OrderBook/' + userId + '/' + bookId, {
      responseType: 'text',
    });
  }
  getOrdersOfUser(userId: number) {
    return this.http.get<Order[]>(this.baseUrl + 'GetOrders/' + userId);
  }
  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'GetAllOrders');
  }

  returnBook(bookId: string, userId: string) {
    return this.http.get(this.baseUrl + 'ReturnBook/' + bookId + '/' + userId, {
      responseType: 'text',
    });
  }
  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + 'GetAllUsers').pipe(
      map((users) => {
        return users.map((user) => {
          let temp: User = user;
          temp.userType = user.userType == 0 ? UserType.USER : UserType.ADMIN;
          return temp;
        });
      })
    );
  }

  blockUser(id: number){
    return this.http.get(this.baseUrl +'ChangeBlockStatus/1/' + id,{
      responseType:'text',
    });
  }
  unblockUser(id: number){
    return this.http.get(this.baseUrl +'ChangeBlockStatus/0/' + id,{
      responseType:'text',
    });
  }
  enableUser(id: number){
    return this.http.get(this.baseUrl +'ChangeEnableStatus/1/' + id,{
      responseType:'text',
    });
  }
  disableUser(id: number){
    return this.http.get(this.baseUrl +'ChangeEnableStatus/0/' + id,{
      responseType:'text',
    });
  }

  // getCategories(){
  //   return this.http.get<CategoryBook[]>(this.baseUrl + 'GetAllCategories');
  // }

  insertBook(book: any){
    return this.http.post(this.baseUrl +'insertBook',book, {
      responseType:'text',
    });
  }
  
  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteBook?id=' + id, {
      responseType: 'text',
    });
  }

  insertCategory(category:string, subcategory:string)
  {
    return this.http.post(
      this.baseUrl + 'InsertCategory',{
        category:category, subcategory:subcategory
      },
      {responseType:'text'}
    );
  }

}
