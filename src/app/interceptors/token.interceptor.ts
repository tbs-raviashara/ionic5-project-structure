import { CallApiService } from './../services/callApi/call-api.service';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public callAPI: CallApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token && !request.url.includes('token')) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `bearer ${token}`,
                    'appVersion': '12.5.0',
                    'DeviceType': 'android',
                    'IsDismiss': 'false'
                }
            });
        }

        return next.handle(request).pipe(
            map((res: any) => {
                if (res.status === 200) {
                    // console.log(res.body);
                }
                return res;
            }),
            catchError(error => {
                if (error.status === 401) {
                    return this.handle401Error(request, next);
                }
                let errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : `Error Code: ${error.status},  Message: ${error.message}`;
                console.log(errorMsg);

                return throwError(errorMsg);
            })
        );
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.callAPI.refreshToken().pipe(
            switchMap((response: any) => {
                localStorage.token = response.access_token;
                request = this.addTokenHeader(request, response.access_token);
                return next.handle(request);
            })
        )
    }

    addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set("Authorization", `bearer ${token}`) });
    }

}