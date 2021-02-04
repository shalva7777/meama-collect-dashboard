import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {NgxSmartModalService} from 'ngx-smart-modal';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';


@Injectable()
export class BaseService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public modalService: NgxSmartModalService,
  ) {
  }

  public headers = new HttpHeaders({'Content-Type': 'application/json'});
  public url = environment.apiPrefix;

  // tslint:disable-next-line:typedef
  private static showLoader() {
    if (document.getElementById('loader')) {
      document.getElementById('loader').classList.remove('hide');
    }
  }

  // tslint:disable-next-line:typedef
  private static hideLoader() {
    if (document.getElementById('loader')) {
      document.getElementById('loader').classList.add('hide');
    }
  }

  get(methodName, pathParams: {}): Promise<any> {
    BaseService.showLoader();
    return this.http.get(this.url + methodName, {params: pathParams})
      .toPromise()
      .then((response) => {
        BaseService.hideLoader();
        return response;
      })
      .catch(this.handleError);
  }

  post(methodName, body): Promise<any> {
    BaseService.showLoader();
    return this.http.post(this.url + methodName, JSON.stringify(body), {headers: this.headers})
      .toPromise()
      .then((response) => {
        BaseService.hideLoader();
        return response;
      })
      .catch(this.handleError);
  }

  delete(methodName): Promise<any> {
    BaseService.showLoader();
    return this.http.delete(this.url + methodName, {headers: this.headers})
      .toPromise()
      .then((response) => {
        BaseService.hideLoader();
        return response;
      })
      .catch(this.handleError);
  }

  put(methodName, body): Promise<any> {
    BaseService.showLoader();
    return this.http.put(this.url + methodName, JSON.stringify(body), {headers: this.headers})
      .toPromise()
      .then((response) => {
        BaseService.hideLoader();
        return response;
      })
      .catch(this.handleError);
  }

  private handleError = (error) => {
    BaseService.hideLoader();
    const message = error.status == 406 ? error.error.message : error.message;
    if (error.status == 401) {
      if (window.location.pathname.indexOf('/login') == -1) {
        if (this.authService.loggedInUser) {
          this.modalService.getModal('loginModal').open(true);
        }
      }
    } else if (error.status == 417) {
      this.authService.logout();
      this.activatedRoute.parent.url.subscribe((urlPath) => {
        const url = urlPath[urlPath.length - 1].path;
        this.router.navigateByUrl(url + '/login');
      });
    } else {
      this.modalService.setModalData({
        body: message
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
    }
    throw error;
  };
}
