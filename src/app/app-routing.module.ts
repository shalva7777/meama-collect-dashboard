import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './view/login/login.component';
import {HomeComponent} from './view/home/home.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {UsersComponent} from './view/security/users/users.component';
import {RolesComponent} from './view/security/roles/roles.component';
import {LanguageComponent} from './view/atom/language/language.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'panel', pathMatch: 'full'}
];

const r: Routes = [
  {
    path: 'panel', component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'roles', component: RolesComponent},
      {path: 'languages', component: LanguageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(r)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
