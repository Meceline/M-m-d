import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/features/articles/interfaces/user';
import { AuthService } from 'src/app/features/auth/services/auth-service';
import { Theme } from 'src/app/features/themes/interfaces/theme';
import { ThemeService } from 'src/app/features/themes/services/theme.service';
import { Router } from '@angular/router';
import { UserProfilService } from '../services/user-profil.service';
import { UserService } from 'src/app/features/auth/services/user-service.service'; 

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: User = {
      username: '', 
      email: '',
      id: 0
    };
    themes: Theme[] = [];
    subscribedThemes: Set<number> = new Set<number>();
    private subscription: Subscription | undefined;
    
    constructor(private themeService: ThemeService, 
                  private authService: AuthService, 
                  private userProfilService: UserProfilService, 
                  private userService: UserService, 
                  private router: Router) {}
  
    ngOnInit(): void {
      this.loadUserProfile();
      this.subscription = this.themeService.getAllThemes().subscribe({
        next: (data: Theme[]) => {
          this.themes = data;
          console.log(this.themes)
          this.loadSubscribedThemes();
        },
        error: (error) => {
          console.error('Erreur : ', error);
        }
      });
    }
  
    loadUserProfile(): void {
      console.log("loaduserprofil")
        this.userProfilService.getUserProfile().subscribe({
          
        next: (user: User) => {
          console.log("subscribe")  
          this.user = user;
        },
        error: (error) => {
          console.log("error")
          console.error('Erreur : ', error);
        }
      });
    }
  
    onSave(): void {
        this.userProfilService.updateUserProfile(this.user).subscribe({
          next: (updatedUser: User) => {
            //this.loadUserProfile();
            console.log('Profil mis à jour');
          },
          error: (error) => {
            console.error('Erreur : ', error);
          }
      });
    }
  
    
    onLogout() {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  

    loadSubscribedThemes(): void {
      this.themeService.getSubscribedThemes().subscribe({
        next: (data: Theme[]) => {
          this.subscribedThemes = new Set(data.map(theme => theme.id));
          console.log(this.subscribedThemes)
        },
        error: (error) => {
          console.error('Erreur : ', error);
        }
      });
    }

    unsubscribe(themeId: number): void {
      this.themeService.unsubscribeFromTheme(themeId).subscribe({
        next: () => {
          this.themes = this.themes.filter(theme => theme.id !== themeId);
          console.log('Unsubscribed from theme ', themeId);
        },
        error: (error) => console.error('Erreur : ', error)
      });
    }

    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }