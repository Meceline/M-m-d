import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { RegisterRequest } from '../interfaces/RegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private subscription: Subscription | undefined;

  registerForm: any;

formControls: { [key: string]: FormControl } = {
  userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  email: new FormControl('', [Validators.email, Validators.required]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$')
  ]),
};

controlNames: { [key: string]: string } = {
  userName: 'Le nom d\'utilisateur doit avoir au moins 2 caractères',
  email: 'L\'adresse mail doit avoir un format valide',
  password: 'Le mot de passe avec au moins 8 caractères, dont 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial',
};

errorMessages: { [key: string]: string } = {
  userName: '',
  email: '',
  password: '',
};

  

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$')
      ]]
    });
  }

  ngOnInit(): void {}

  onBlur(controlName: string): void {
    const control = this.formControls[controlName];
    control.markAsTouched();
    if (control.hasError('required')) {
      this.errorMessages[controlName] = `Veuillez saisir ${this.controlNames[controlName]}`;
    } else if (control.hasError('pattern')) {
      this.errorMessages[controlName] = 'Le mot de passe ne réponds pas aux exigences';
    } else {
      this.errorMessages[controlName] = '';
    }
  }

  onSubmit(): void {
    console.log("register")
     if (this.formControls["userName"].valid && this.formControls['email'].valid && this.formControls['password'].valid) {
      const registerRequest: RegisterRequest = {
        userName: this.formControls['userName'].value,
        email: this.formControls['email'].value,
        password: this.formControls['password'].value,
      };
      
      this.subscription = this.authService.register(registerRequest).subscribe({
        next: (data) => {
          console.log("ok ", data)
          this.router.navigate(['/articles']); //Article component
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          this.errorMessages['userName'] = 'Erreur lors de l\'inscription. Veuillez réessayer.';
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


