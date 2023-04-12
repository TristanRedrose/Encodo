import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { LoginRequest } from "src/app/models/auth/loginRequest.type";
import { AuthFormFactory } from "src/app/services/factories/auth/authFormFactory.service";
import { SessionService } from "src/app/services/session/session.service";
import { Router } from "@angular/router";
import { LoadingSpinnerService } from "src/app/services/loading/loading.service";
import { finalize } from "rxjs";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    isLoading = this.loadingService.isLoading$;

    constructor(
        private authFormFactory: AuthFormFactory, 
        private sessionService: SessionService,
        private router: Router,
        private loadingService: LoadingSpinnerService,
    ) {}

    ngOnInit(): void {
        if (this.sessionService.userLoggedIn.getValue()) {
            this.router.navigate(['encode']);
        }

        this.loginForm = this.authFormFactory.loginForm();
    }
    
    onLogin(): void {
        if (this.loginForm.invalid) {
            return;
        }

        const loginRequest: LoginRequest = {
            email: this.email.value,
            password: this.password.value,
        }

        this.loadingService.show();
        this.sessionService.login(loginRequest)
            .pipe(finalize(() => {
                this.loadingService.hide();
                })
            )
            .subscribe(() => {
                this.router.navigate(['encode']);
                }
            );
    }

    get email(): AbstractControl {
        return this.loginForm.controls['email'];
    }

    get password(): AbstractControl {
        return this.loginForm.controls['password'];
    }
}