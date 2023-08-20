import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { UserType } from './models/models';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private api: ApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  |Observable<boolean | UrlTree>
  |Promise<boolean | UrlTree>
  |boolean
  |UrlTree
  {
    if(this.api.isLoggedIn()){
      if(this.api.getTokenUserInfo()?.userType===UserType.ADMIN){
        return true;
      }
      return false;
    }
    return false;
  }
}
export const authorizationGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot)=> {

  return inject(PermissionsService).canActivate(route, state);
};
