import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
  }

  transform(url): Promise<SafeUrl> {
    return this.http
      .get(url, {responseType: 'blob'})
      .toPromise()
      .then((val) => {
          return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))
        }
      );
  }
}
