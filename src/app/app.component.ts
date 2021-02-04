import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './view/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'meama-collect-dashboard';

  ngOnDestroy(): void {
    this.authService.logout();
  }

  constructor(public authService: AuthService,
              public router: Router) {
    if (!this.authService.authenticated) {
      this.router.navigateByUrl('/login');
    }
  }
}
