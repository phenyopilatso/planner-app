import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Url } from "url";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authServcice: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        
        return this.authServcice.user.pipe(
            take(1),
            map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            else {
                return this.router.createUrlTree(['/auth']);
            }
        }));
    }

}