import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  errorMessage: string;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }


  login = () => {
    this.authService.login(this.credentials).then((response) => {
      this.router.navigateByUrl('/panel/dashboard');
      console.log("eg ar")
    }).catch(error => {
      if (error.status === 406 || error.status === 500) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = error.message;
      }
    });
  };

  ngOnInit(): void {
  }

}
