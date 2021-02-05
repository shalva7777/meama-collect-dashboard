import {APP_INITIALIZER, Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/home/home.component';
import {LoginComponent} from './view/login/login.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {AuthService} from './view/services/auth.service';
import {AccessService} from './view/services/access.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LocalStorageService, Ng2Webstorage} from 'ngx-webstorage';
import {TokenInterceptor} from './token.interceptor';
import {SecurePipe} from './view/services/secure.pipe';
import {Utils} from './view/services/utils';
import {BaseService} from './view/services/base.service';
import {CapCheckboxComponent} from './view/components/cap-fields/cap-checkbox.component';
import {CapColorPickerComponent} from './view/components/cap-fields/cap-color-picker.component';
import {CapComboComponent} from './view/components/cap-fields/cap-combo.component';
import {CapDynamicComboComponent} from './view/components/cap-fields/cap-dynamic-combo.component';
import {CapDynamicComboColumnComponent} from './view/components/cap-fields/cap-dynamic-combo-column.component';
import {CapMultiCheckboxComponent} from './view/components/cap-fields/cap-multi-checkbox.component';
import {CapMultiselectComponent} from './view/components/cap-fields/cap-multiselect.component';
import {CapTextareaComponent} from './view/components/cap-fields/cap-textarea.component';
import {CapTreeCheckboxComponent} from './view/components/cap-fields/cap-tree-checkbox.component';
import {CapUploadModal} from './view/components/cap-fields/cap-upload-modal.component';
import {FormUploadComponent} from './view/components/cap-fields/cap-upload.component';
import {UploadFileService} from './view/services/upload-file.service';
import {CapInputComponent} from './view/components/cap-fields/cap-input/cap-input.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ConfirmComponent} from './view/components/cap-modals/confirm.component';
import {AlertComponent} from './view/components/cap-modals/alert.component';
import {CapAlertModal} from './view/components/cap-modals/cap-alert.modal';
import {CapStaticTableComponent} from './view/components/cap-static-table/cap-static-table.component';
import {CapTabsComponent} from './view/components/cap-tabs/tabs.component';
import {DatePickerComponent} from './view/components/date/datepicker.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {UserService} from './view/services/user.service';
import {RolesComponent} from './view/security/roles/roles.component';
import {UsersComponent} from './view/security/users/users.component';
import {RoleService} from './view/services/role.service';
import {PrivilegeService} from './view/services/privilege.service';
import {CapTableComponent} from './view/components/cap-table/cap-table.component';
import {CapColumnComponent} from './view/components/cap-table/cap-column.component';
import {CapTabComponent} from './view/components/cap-tabs/tab.component';
import {LanguageService} from './view/services/language.service';
import {LanguageComponent} from './view/atom/language/language.component';
import {CategoryService} from './view/services/category.service';
import {CategoryComponent} from './view/atom/category/category.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  // tslint:disable-next-line:typedef
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    SecurePipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    CapCheckboxComponent,
    CapColorPickerComponent,
    CapComboComponent,
    CapDynamicComboComponent,
    CapDynamicComboColumnComponent,
    CapInputComponent,
    CapMultiCheckboxComponent,
    CapMultiselectComponent,
    CapTextareaComponent,
    CapTreeCheckboxComponent,
    CapUploadModal,
    FormUploadComponent,
    ConfirmComponent,
    AlertComponent,
    CapAlertModal,
    CapStaticTableComponent,
    CapTabsComponent,
    DatePickerComponent,
    DashboardComponent,
    RolesComponent,
    UsersComponent,
    CapTableComponent,
    CapColumnComponent,
    CapTabComponent,
    LanguageComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DragDropModule,
  ],
  providers: [AuthService,
    AccessService,
    NgxSmartModalService,
    LocalStorageService,
    Ng2Webstorage,
    Utils,
    BaseService,
    UploadFileService,
    UserService,
    RoleService,
    PrivilegeService,
    LanguageService,
    CategoryService,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => function() {
        return authService.load();
      },
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      deps: [LocalStorageService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
