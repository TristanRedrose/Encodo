import { Injectable } from '@angular/core';
import { Session } from 'src/app/models/session/session.type';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoginRequest } from 'src/app/models/auth/loginRequest.type';
import { LoginResponse } from 'src/app/models/auth/loginResponse.type';

@Injectable({
    providedIn: 'root',
})

export class SessionService {
    userLoggedIn = new BehaviorSubject<boolean>(false);
    userLoggedIn$ = this.userLoggedIn.asObservable();

    private _session: Session = {
        token: null
    }

    constructor(private http: HttpClient){}

    setSession(session:Session): void {
        this._session = session;
        localStorage.setItem('currentSession', JSON.stringify(session));
        this.userLoggedIn.next(true);
    }

    clearSession(): void {
        this._session = {
            token: null,
        }
        this.userLoggedIn.next(false);
    }

    login(LoginRequest: LoginRequest): Observable<void> {
        return this.http.post<LoginResponse>('http://localhost:3000/login', LoginRequest)
            .pipe(
                map((res: LoginResponse) => {
                    const session: Session = {
                        token: res.token,
                    }

                    this.setSession(session);
                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage= '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error ${error.error.message}`;
                    }
                    else {
                        errorMessage = `Error code ${error.status}; message: ${error.message}`;
                    }
                    return throwError(() => new Error(errorMessage));
                })
            );
    }

    logout(): void {
        this.clearSession();
        localStorage.clear();
    }

    checkSession(): void {
        const sessionString = localStorage.getItem('currentSession');
        if (sessionString) {
            const session = JSON.parse(sessionString);
            this.setSession(session);
        }
    }

    get session(): Session {
        return this._session;
    }

    get token(): string | null {
        return this._session.token;
    }
}