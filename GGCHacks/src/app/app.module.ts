//Module Imports
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { LoginComponent } from "./UserStuff/login/login.component";
import { VerifyEmailComponent } from "./email-action/verify-email/verify-email.component";
import { HeaderComponent } from "./header/header.component";
import { EmailActionComponent } from "./email-action/email-action.component";
import { ResetPasswordComponent } from "./email-action/reset-password/reset-password.component";
import { ApplicationComponent } from "./application/application.component";
import { UserQueryPipe } from "./admin-dashboard/user-query.pipe";
import { VerifyEmailUserComponent } from "./UserStuff/verify-email-user/verify-email-user.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { EventGalleryComponent } from "./event-gallery/event-gallery/event-gallery.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { TestNavbarComponent } from "./test-navbar/test-navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { FaqComponent } from "./faq/faq-section";
import { SponsorComponent } from "./sponsor/sponsor.component";
import {RegistrationComponent} from './registration/registration.component';
import { ViewScheduleGalleryComponent } from './viewSchedule/view-schedule-gallery.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingpageComponent,
    LoginComponent,
    VerifyEmailComponent,
    HeaderComponent,
    EmailActionComponent,
    ResetPasswordComponent,
    ApplicationComponent,
    UserQueryPipe,
    VerifyEmailUserComponent,
    EventGalleryComponent,
    AdminDashboardComponent,
    TestNavbarComponent,
    FaqComponent,
    SponsorComponent,
    RegistrationComponent,
    ViewScheduleGalleryComponent,
    FirestoreEditorComponent,
    OverviewComponent,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
