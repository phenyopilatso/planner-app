import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { AuthResponseData, AuthService } from "./auth.service";
import { PlaceholderDirective} from '../shared/placeholder/placeholder.directive';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closedSub: Subscription;

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy() {
        if (this.closedSub) {
            this.closedSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode){
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessase => {
                console.log(errorMessase);
                this.error = errorMessase;
                this.showErrorAlert(errorMessase);
                this.isLoading =false;  
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        componentRef.instance.message = message;
        this.closedSub = componentRef.instance.close.subscribe(() => {
            this.closedSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}