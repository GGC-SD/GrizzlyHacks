import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from '../landingpage/landingpage.component';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {EmailActionComponent} from '../email-action/email-action.component';
import {CreateAccountComponent} from '../UserStuff/create-account/create-account.component';
import {LoginComponent} from '../UserStuff/login/login.component';
import {UserGuardGuard} from '../guards/user-guard.guard';
import {UserDashboardComponent} from '../UserStuff/user-dashboard/user-dashboard.component';
import {ApplicationComponent} from '../application/application.component';
import {AdminGuard} from '../guards/admin.guard';
import {VerifyEmailUserComponent} from '../UserStuff/verify-email-user/verify-email-user.component';
import {BlogHomeComponent} from '../blog/blog-home/blog-home.component';
import {BlogPostingPageComponent} from '../blog/blog-posting-page/blog-posting-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingpageComponent },
  { path: 'user', component: UserDashboardComponent, canActivate: [UserGuardGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'email/action', component: EmailActionComponent, data: { title: 'Confirm Email Address' }},
  { path: 'createAccount', component: CreateAccountComponent},
  { path: 'application', component: ApplicationComponent},
  { path: 'verifyEmail', component: VerifyEmailUserComponent},
  { path: 'blogHome', component: BlogHomeComponent},
  { path: 'blogPostingPage', component: BlogPostingPageComponent},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
