import {AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Utils} from '../services/utils';
import {UserService} from '../services/user.service';
import {ChangePassword} from '../models/security/changePassword';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AccessService} from '../services/access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked, AfterViewInit {

  constructor(public userService: UserService,
              public authService: AuthService,
              public utils: Utils,
              public router: Router,
              public renderer: Renderer2,
              public modalService: NgxSmartModalService,
              public activatedRoute: ActivatedRoute,
              public accessService: AccessService) {
  }

  title = 'app';
  enteredPassword: string;
  message;
  errorTitle: string;
  errorMessage: string;
  changePassword: ChangePassword;
  passwordRepeated: string;


  @ViewChild('menu') menu: ElementRef;

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    if (this.authService.loggedInUser.changePassword) {
      this.showChangePasswordModal();
      return;
    }
  }

  logout = () => {
    this.authService.logout().then((response) => {
      this.router.navigateByUrl('/login');
    });
  }

  showChangePasswordModal = () => {
    // tslint:disable-next-line:new-parens
    this.changePassword = new ChangePassword;
    this.modalService.getModal('changePasswordModal').open();

  }

  // tslint:disable-next-line:typedef
  ngAfterViewChecked() {
    const menuHTML = this.menu.nativeElement as HTMLElement;
    if (menuHTML.querySelector('.active-page')) {
      const menuItem = menuHTML.querySelector('.active-page').parentElement;
      this.renderer.setStyle(menuItem, 'display', 'block');
      menuItem.parentElement.classList.add('active');
    }
  }

  activateParenItem = (menuItem: HTMLElement) => {
    if (menuItem.parentElement.classList.contains('active')) {
      menuItem.style.display = 'none';
      menuItem.parentElement.classList.remove('active');
    } else {
      menuItem.style.display = 'block';
      menuItem.parentElement.classList.add('active');
    }
  }

  redirectTo = (event, linkTo: string) => {
    if (event.which === 2) {
      this.activatedRoute.url.subscribe((urlPath) => {
        const url = urlPath[urlPath.length - 1].path;
        window.open(url + '/' + linkTo, '_blank');
        window.focus();
      }).unsubscribe();
    }
  }

  updatePassword() {
    this.userService.changeSelfPassword(this.changePassword).then((response) => {
      this.passwordRepeated = '';
      this.modalService.getModal('changePasswordModal').close();
      this.logout();
    });
  }

  continueSession() {
    this.authService.login({
      username: this.authService.loggedInUser.username,
      password: this.enteredPassword
    }).then((response) => {
      this.modalService.getModal('loginModal').close();
    }).catch(() => {
      this.modalService.getModal('loginModal').close();
      this.logout();
    });
  }

}
