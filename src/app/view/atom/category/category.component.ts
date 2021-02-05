import {Component, OnInit} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Category} from '../../models/atom/category/category';
import {PagingLoader} from '../../models/loader';
import {AccessService} from '../../services/access.service';
import {Utils} from '../../services/utils';
import {CategoryService} from '../../services/category.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../models/atom/language';
import {StandartTranslation} from '../../models/standartTranslation';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public accessService: AccessService,
              public utils: Utils,
              public modalService: NgxSmartModalService,
              public categoryService: CategoryService,
              public languageService: LanguageService) {
    this.reloadAllData();
    this.languageService.find(-1, -1, null).then(response => {
      this.languages = response.resultList;
    });
  }

  selectedCategory: Category;
  categories: Category [] = [];
  categoriesForIndex: Category [] = [];
  subCategoriesForIndex: Category [] = [];
  loader: PagingLoader = new PagingLoader(true, true);
  isManage = true;
  languages: Language[];

  mainLanguage: Language;
  selectedFiles: FileList;
  currentFileUpload: File;

  ngOnInit() {
  }

  reloadAllData() {
    this.categoryService.findCategoriesForNew(null).then((response) => {
      this.categories = response;
    });
    this.languageService.findMainLanguage().then((response) => {
      this.mainLanguage = response;
    });
  }

  public getCategories = (request) => {
    return this.categoryService.findCategoriesQuick(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  };

  getFilteredCategories = (request) => {
    return this.categoryService.findCategories(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  };

  openImageModal(item) {
    this.selectedCategory = (JSON.parse(JSON.stringify(item)) as Category);
    this.utils.setPrevObj(JSON.stringify(item));
    this.modalService.getModal('categoryImageModal').open();
  }

  showAddModal(data) {
    if (data.item) {
      this.selectedCategory = (JSON.parse(JSON.stringify(data.item)) as Category);
      this.selectedCategory.id = null;
      this.selectedCategory.imageUrl = null;
    } else {
      this.selectedCategory = new Category();
    }
    this.reloadAllData();
    this.modalService.getModal('categoryModal').open();
  }


  activationConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to activate category?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.categoryService.activate(this.selectedCategory.id).then((response) => {
          this.selectedCategory = response;
          this.loader = this.loader.load(true);
          this.reloadAllData();
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  deactivationConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to deactivate category?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.categoryService.deactivate(this.selectedCategory.id).then((response) => {
          this.selectedCategory = response;
          this.loader = this.loader.load(true);
          this.reloadAllData();
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  saveCategory() {
    this.categoryService.create(this.selectedCategory).then((response) => {
      this.modalService.getModal('categoryModal').close();
      this.loader = this.loader.load(true);
      this.reloadAllData();
    });
  }

  showAddEditModal(data): void {
    this.selectedCategory = (JSON.parse(JSON.stringify(data.row)) as Category);
    // this.categoryService.findTranslationOnMainLanguage(this.selectedCategory.id).then(response => {
    //   this.selectedTranslation = response;
    //   this.modalService.getModal('categoryModal').open();
    // });
    // this.selectedTranslation.referenceId = this.selectedCategory.id;
    // this.selectedTranslation.language = (JSON.parse(JSON.stringify(this.mainLanguage)) as Language);
    const translationMap = {};
    for (let mes of this.selectedCategory.translations) {
      if (!translationMap[mes.language.code]) {
        translationMap[mes.language.code] = mes;
      }
    }
    for (const lang of this.languages) {
      if (!translationMap[lang.code]) {
        const translation = new StandartTranslation();
        translation.language = lang;
        this.selectedCategory.translations.push(translation);
        translationMap[lang.code] = translation;
      }
    }
    this.categoryService.findCategoriesForNew({id: this.selectedCategory.id}).then((response) => {
      this.categories = response;
      this.modalService.getModal('categoryModal').open();
    });
  }

  updateCategory() {
    this.categoryService.update(this.selectedCategory).then((response) => {
      this.modalService.getModal('categoryModal').close();
      this.loader = this.loader.load(false);
    });
    // if (this.selectedTranslation.id) {
    //   this.categoryService.updateTranslation(this.selectedTranslation);
    // }
    this.reloadAllData();
  }

  // showTranslationModal(category) {
  //   this.selectedCategory = (JSON.parse(JSON.stringify(category)) as Category);
  //   this.modalService.getModal('categoryTranslationsModal').open(true);
  //   this.reloadTranslationData();
  // }
  //
  // reloadTranslationData = () => {
  //   if (this.selectedCategory) {
  //     return this.categoryService.getTranslations(this.selectedCategory.id).then((response) => {
  //       return this.selectedTranslations = response;
  //     });
  //   }
  // }

  // selectFile(event) {
  //   const file = event.target.files.item(0);
  //   this.selectedFiles = event.target.files;
  //
  //   // if (file.type.match('image.*')) {
  //   // } else if (file.type.match('.html')) {
  //   //   this.selectedFiles = event.target.files;
  //   // } else {
  //   //   alert('invalid format!');
  //   // }
  // }
  //
  // upload() {
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   if (this.currentFileUpload.size / 1000 >= 10000) {
  //     this.modalService.setModalData({
  //       body: 'File size exceeds 500 kb'
  //     }, 'alertModal', true);
  //     this.modalService.getModal('alertModal').open(true);
  //     return;
  //   }
  //
  //   this.uploadService.pushExcelFileToStorage(this.currentFileUpload, 1).then((response) => {
  //   });
  //   this.selectedFiles = undefined;
  // }

  showIndexModal = () => {
    this.categoryService.findCategories(-1, -1, null).then((response) => {
      this.categoriesForIndex = response.resultList;
      this.categoriesForIndex.sort((a, b) => (a.id > b.id) ? 1 : -1);
      this.modalService.getModal('indexModal').open();
    });
  };

  drop(event: CdkDragDrop<string[]>, b: boolean) {
    if (b) {
      moveItemInArray(this.categoriesForIndex, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.subCategoriesForIndex, event.previousIndex, event.currentIndex);
    }
  }

  showSubCategories(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categoriesForIndex.length; i++) {
      if (this.categoriesForIndex[i].parentCategoryId === id) {
        this.subCategoriesForIndex.push(this.categoriesForIndex[i]);
      }
    }
  }

}
