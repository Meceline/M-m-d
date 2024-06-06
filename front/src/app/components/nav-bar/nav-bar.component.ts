import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/features/auth/services/user-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
