import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/shared/models/general.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Call auth service to handle login attempt.
   */
  handleLoginAttempt(data: AuthData) {
    this.authService.login(data);
  }

}
