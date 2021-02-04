import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {ListResult} from '../models/response/list-result';
import {Category} from '../models/atom/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url = 'api/atom/categories';

  constructor(public baseService: BaseService) {
  }

  findCategoriesQuick(limit, offset, pathParams: {}): Promise<ListResult<Category>> {
    return this.baseService.get(this.url + '/' + limit + '/' + offset, pathParams);
  }

  findCategories(limit, offset, pathParams: {}): Promise<ListResult<Category>> {
    return this.baseService.get(this.url + '/advance/' + limit + '/' + offset, pathParams);
  }

  create(category: Category): Promise<Category> {
    return this.baseService.post(this.url, category);
  }

  update(category: Category): Promise<Category> {
    return this.baseService.put(this.url + '/' + category.id, category);
  }

  activate(id: number): Promise<Category> {
    return this.baseService.put(this.url + '/' + id + '/activate', null);
  }

  deactivate(id: number): Promise<Category> {
    return this.baseService.put(this.url + '/' + id + '/deactivate', null);
  }
}
