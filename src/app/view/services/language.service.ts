import {Injectable} from '@angular/core';

// import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {ListResult} from '../models/response/list-result';
import {Language} from '../models/atom/language';


@Injectable()
export class LanguageService {

  public url = 'api/atom/languages';

  constructor(public baseService: BaseService) {
  }

  find(limit, offset, pathParams: {}): Promise<ListResult<Language>> {
    return this.baseService.get(this.url + '/' + limit + '/' + offset, pathParams);
  }

  findMainLanguage(): Promise<Language> {
    return this.baseService.get(this.url + '/main', {});
  }

  save(Language: Language): Promise<Language> {
    return this.baseService.post(this.url, Language);
  }

  update(language: Language): Promise<Language> {
    return this.baseService.put(this.url + '/' + language.id, language);
  }

  delete(id: number): Promise<any> {
    return this.baseService.delete(this.url + '/' + id);
  }

  markAsMain(id: number): Promise<Language> {
    return this.baseService.put(this.url + '/' + id + '/mark-as-main', null);
  }

  unmarkMain(id: number): Promise<Language> {
    return this.baseService.put(this.url + '/' + id + '/unmark-main', null);
  }
}
