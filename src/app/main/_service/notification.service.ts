import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationComponent } from '../common/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }


  /**
   * Open snack bar at top-right corner like Notification
   * 
   * @param {string} message Display message
   * @param {string} type Message type @default success
   * @param {string} icon Material Icon name which is show in front @default info
   * @param {number} duration Duration in miliseconds @default 2000
   * @param {boolean} showCloseButton Show close button at end @default true
   */
  show(message: string, type?: 'success' | 'error' | 'info', icon?: string, duration?: number, showCloseButton?: boolean) {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: duration ? duration : 3000,
      panelClass: ['message-box', 'p-8', ...type && type !== 'success' ? type === 'error' ? ['error'] : ['info'] : ['success']],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: {
        message: message,
        icon: icon ? icon : 'info',
        showCloseButton: showCloseButton ? showCloseButton : true,
      }
    });
  }

}
