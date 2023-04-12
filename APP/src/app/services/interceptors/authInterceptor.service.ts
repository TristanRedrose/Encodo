import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "../session/session.service";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private sessionService: SessionService,
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.sessionService.checkSession();
        const token = this.sessionService.token;

        if (token) {
            req = req.clone({
                setHeaders: {'Authorization': `${token}`}
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigateByUrl('');
                    }
                }
                return throwError(() => new Error(err));
            })
        )
    }
}