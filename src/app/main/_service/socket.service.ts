import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private pusherClient: Pusher;
  private subject: Subject<any> = new Subject<any>();

  constructor() {
    this.pusherClient = new Pusher(environment.pusherKey, { cluster: environment.cluster });
    const channel = this.pusherClient.subscribe('stats_channel');
    channel.bind(
      'live_stats',
      (data: any) => {
        this.subject.next(data);
      }
    );
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
}
