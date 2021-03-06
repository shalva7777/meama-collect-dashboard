import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {ListResult} from '../models/response/list-result';
import {Category} from '../models/atom/category/category';
import {GeneralLookup} from '../models/request/general-lookup';

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

  findCategoriesForNew(pathParams: {}): Promise<Category[]> {
    return this.baseService.get(this.url + '/for-new-category', pathParams);
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

  getCategorytypes(): Promise<GeneralLookup[]> {
    return this.baseService.get(this.url + '/category-types', {});
  }

  // tslint:disable-next-line:typedef
  index(categories: Category[]): Promise<boolean> {
    return this.baseService.post(this.url + '/index', categories);
  }
}
