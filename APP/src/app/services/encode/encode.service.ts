import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EncodeRequest } from 'src/app/models/encode/encodeRequest.type';
import { EncodeResponse } from 'src/app/models/encode/encodeResponse.type';

@Injectable({
    providedIn: 'root',
})

export class EncodeService {

    constructor(private http: HttpClient){}

    encode(encodeRequest: EncodeRequest): Observable<string> {
        return this.http.post<EncodeResponse>('http://localhost:3000/encode', encodeRequest)
            .pipe(
                map((res: EncodeResponse) => {
                    return res.encodedData;
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
}