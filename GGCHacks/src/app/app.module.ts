//Module Imports
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./modules/app-routing.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FirestoreEditorComponent } from "./admin-dashboard/firestore-editor/firestore-editor.component";

//FireBase Imports
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { environment } from "../environments/environment";

//Components
import { AppComponent } from "./app.component";
import { CreateAccountComponent } from "./UserStuff/create-account/create-account.component";
import { LoginComponent } from "./UserStuff/login/login.component";
import { VerifyEmailComponent } from "./email-action/verify-email/verify-email.component";
import { HeaderComponent } from "./header/header.component";
import { EmailActionComponent } from "./email-action/email-action.component";
import { ResetPasswordComponent } from "./email-action/reset-password/reset-password.component";
import { UserDashboardComponent } from "./UserStuff/user-dashboard/user-dashboard.component";
import { ApplicationComponent } from "./application/application.component";
import { UserQueryPipe } from "./admin-dashboard/user-query.pipe";
import { EventCalendarComponent } from "./EventCalendarStuff/event-calendar/event-calendar.component";
import { VerifyEmailUserComponent } from "./UserStuff/verify-email-user/verify-email-user.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { BlogHomeComponent } from "./blog/blog-home/blog-home.component";
import { BlogPostingPageComponent } from "./blog/blog-posting-page/blog-posting-page.component";
import { EditBlogModalComponent } from "./blog/blog-home/edit-blog-modal/edit-blog-modal.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { TestNavbarComponent } from "./test-navbar/test-navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { FaqComponent } from "./faq/faq-section";
import { EventCreatorComponent } from "./admin-dashboard/event-creator/event-creator.component";
import { EditEventModalComponent } from "./admin-dashboard/edit-event-modal/edit-event-modal.component";
import { SponsorComponent } from "./sponsor/sponsor.component";
import {RegistrationComponent} from './registration/registration.component';
import { ViewScheduleComponent } from './viewSchedule/view-schedule.component';
import { JudgeTrackerComponent } from "./judge-tracker/judge-tracker.component";


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
    AdminDashboardComponent,
    TestNavbarComponent,
    FooterComponent,
    FaqComponent,
    EventCreatorComponent,
    EditEventModalComponent,
    SponsorComponent,
    RegistrationComponent,
    ViewScheduleComponent,
    JudgeTrackerComponent,
    FirestoreEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    DragDropModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
