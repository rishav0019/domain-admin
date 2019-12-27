import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent  {

  email: string;
  password: string;
  ifLoginProgress = false;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  public onEmailandPasswordSignIn() {
    this.ifLoginProgress = true;
    this.authService.onEmailandPasswordSignIn(this.email, this.password);
  }

  public keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.onEmailandPasswordSignIn();
    }
  }

}
