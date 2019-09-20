import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService, NotificationService } from '../_service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private notificationService: NotificationService, private _fuseProgressBarService: FuseProgressBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            }

            console.log('ERROR INTERCEPTOR :: ', err);

            const error = err.error.msg || err.statusText;

            if (err.status !== 200) {
                this.notificationService.show(error, 'error');
            }

            this._fuseProgressBarService.hide();

            return throwError(error);
        }))
    }
}