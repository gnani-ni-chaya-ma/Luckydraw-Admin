import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  getWinnerList(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/winner_list`, {});
  }

  generateResult(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/generateResult`, data);
  }
}