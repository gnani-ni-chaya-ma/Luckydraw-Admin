import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'app/main/_service';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fuseProgressBarService: FuseProgressBarService,
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };

    if (this._authService.isLoggedIn) {
      this._router.navigate(['/dashboard']);
    } else {
      this._authService.logout();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }


  async login() {
    try {
      this._fuseProgressBarService.show();
      // let user = await this._authService.login(this.loginForm.value).toPromise();
      let user = { name: 'Milan Vadher', email: 'milanvadher1996@gmail.com', id: 1 };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._authService.currentUserSubject.next(user);
      this._router.navigate([this.returnUrl]);
      this._fuseProgressBarService.hide();
    } catch (error) {
      this._fuseProgressBarService.hide();
      console.error('Error in LOGIN ::', error);
    }
  }

}
