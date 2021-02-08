import {StandartTranslation} from '../../standartTranslation';

export class Category {
  public id: number;
  public code: string;
  public name: string;
  public imageUrl: string;
  public parentCategoryId: number;
  public parentCategory: Category;
  public active: boolean;
  public translations: StandartTranslation[];
  public sortIndex: number;
  public categoryType: any;
}
