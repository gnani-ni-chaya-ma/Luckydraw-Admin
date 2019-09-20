import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api-token-auth/`, data);
  }

  logout() {
    console.log('LogOut');
    localStorage.clear();
    this.currentUserSubject.next(null);
    this._router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    let user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return true;
    }
    return false;
  }
}
