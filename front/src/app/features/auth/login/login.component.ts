import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { LoginRequest } from '../interfaces/LoginRequest'; // Import the LoginRequest type
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private subscription: Subscription | undefined;
  loginForm: any;
  errorMessage: string = "";

  formControls: { [key: string]: FormControl} = {
    emailOrUsername: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  }
  

  constructor(private fb: FormBuilder,private authService: AuthService, public userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      emailOrUserName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}


  onSubmit(): void {
    if (this.formControls["emailOrUsername"].valid  && this.formControls['password'].valid) {
      console.log('login');
      const loginRequest: LoginRequest = {
        emailOrUserName: this.formControls['emailOrUsername'].value,
        password: this.formControls['password'].value,
      };
  console.log(loginRequest);
      this.subscription = this.authService.login(loginRequest).subscribe({
          next: (data) => {
            console.log("ok ", data)
            localStorage.setItem('token', data.token);
            this.userService.isLoggedIn();
            this.router.navigate(['/articles']); //Article component
          },
          error: (error) => {
            console.error('Erreur de connection:', error); 
            // Afficher un message d'erreur  à l'utilisateur
            this.errorMessage = error.message;
          }
        });
     }
  }

    ngOnDestroy(): void {
      if (this.subscription) {
      this.subscription.unsubscribe();
  }
  }
  
}
