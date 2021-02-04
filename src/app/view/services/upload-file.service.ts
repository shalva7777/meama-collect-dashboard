import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {environment} from '../../../environments/environment';

@Injectable()
export class UploadFileService {

  constructor(public http: HttpClient,
              public modalService: NgxSmartModalService,
              public authService: AuthService) {
    this.handleError = this.handleError.bind(this);
  }

  public headers = new HttpHeaders({'Content-Type': 'application/json'});


  pushFileToStorage(file: File): Promise<any> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', environment.apiPrefix + 'api/filesystem/upload', formdata, {
      reportProgress: true,
    });
    return this.http.request(req)
      .toPromise()
      .then((response) => {
        return response['body']['Name'] as string;
      })
      .catch(this.handleError);
  }

  getImage(filename): Promise<any> {
    return this.http.get(environment.apiPrefix + 'api/filesystem/load/' + filename.split('.')[0] + '/' + filename.split('.')[1])
      .toPromise()
      .then((response) => {
        return response['Name'];
      })
      .catch(this.handleError);
  }

  deleteImage(filename): Promise<any> {
    return this.http.post(environment.apiPrefix + 'api/filesystem/delete', {fileUrl: filename}, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  public handleError(error: any): Promise<any> {
    let message = error.status == 406 ? error.error.message : error.message;
    if (error.status == 401) {
      if (window.location.pathname.indexOf('/login') == -1) {
        if (this.authService.loggedInUser) {
          this.modalService.getModal('loginModal').open(true);
        }
      }
    } else {
      this.modalService.setModalData({
        body: message
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
    }
    throw error;
  }
}
