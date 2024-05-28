import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private subscription: Subscription | undefined;
  formControls: { [key: string]: FormControl} = {
      text: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
  }

  constructor(
    private authService: AuthService, 
    private router: Router) {}

  ngOnInit(): void {}


  onSubmit(): void {
    if (this.formControls["text"].valid  && this.formControls['password'].valid) {
      console.log('login');
    }}

    ngOnDestroy(): void {
      if (this.subscription) {
      this.subscription.unsubscribe();
  }
  }
  
}
