import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth-service';
import { UserService } from 'src/app/features/auth/services/user-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private userService: UserService) {}
  
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
