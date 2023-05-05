//Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './modules/app-routing.module';


//FireBase Imports
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

//Components
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './UserStuff/create-account/create-account.component';
import { LoginComponent } from './UserStuff/login/login.component';
import { VerifyEmailComponent } from './email-action/verify-email/verify-email.component';
import { HeaderComponent } from './header/header.component';
import { EmailActionComponent } from './email-action/email-action.component';
import { ResetPasswordComponent } from './email-action/reset-password/reset-password.component';
import { UserDashboardComponent } from './UserStuff/user-dashboard/user-dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { UserQueryPipe } from './admin-dashboard/user-query.pipe';
import { EventCalendarComponent } from './EventCalendarStuff/event-calendar/event-calendar.component';
import { VerifyEmailUserComponent } from './UserStuff/verify-email-user/verify-email-user.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { BlogPostingPageComponent } from './blog/blog-posting-page/blog-posting-page.component';
import { EditBlogModalComponent } from './blog/blog-home/edit-blog-modal/edit-blog-modal.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    CreateAccountComponent,
    LoginComponent,
    VerifyEmailComponent,
    HeaderComponent,
    EmailActionComponent,
    ResetPasswordComponent,
    UserDashboardComponent,
    ApplicationComponent,
    UserQueryPipe,
    EventCalendarComponent,
    VerifyEmailUserComponent,
    BlogHomeComponent,
    BlogPostingPageComponent,
    EditBlogModalComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
