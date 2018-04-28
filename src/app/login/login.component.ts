import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public error;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    protected translateService: TranslateService
  ) {
    this.authenticationService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.error = undefined;
    this.authenticationService.login(this.user.username, this.user.password).subscribe(
      response => this.authenticationService.setToken(response),
      error => {
        if (error.status === 401) {
          this.error = this.translateService.instant('LOGINPAGE.INVALID_CREDENTIALS'); }
        }
    );
  }

}
