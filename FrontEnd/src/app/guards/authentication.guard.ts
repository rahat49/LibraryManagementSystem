import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.api.isLoggedIn();
  }
}
export const authenticationGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot)=> {

  return inject(PermissionsService).canActivate(route, state);
};
