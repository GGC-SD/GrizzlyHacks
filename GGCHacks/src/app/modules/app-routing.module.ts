//components
import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from '../landingpage/landingpage.component';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {EmailActionComponent} from '../email-action/email-action.component';
import {LoginComponent} from '../UserStuff/login/login.component';
import {UserGuardGuard} from '../guards/user-guard.guard';
import {ApplicationComponent} from '../application/application.component';
import {AdminGuard} from '../guards/admin.guard';
import {VerifyEmailUserComponent} from '../UserStuff/verify-email-user/verify-email-user.component';
import {EventGalleryComponent} from '../event-gallery/event-gallery/event-gallery.component';
import {RegistrationComponent} from "../registration/registration.component";
import {ViewScheduleGalleryComponent} from "../viewSchedule/view-schedule-gallery.component";
import {SponsorComponent} from "../sponsor/sponsor.component";
import {OverviewComponent} from "../overview/overview.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingpageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'email/action', component: EmailActionComponent, data: { title: 'Confirm Email Address' }},
  { path: 'application', component: ApplicationComponent},
  { path: 'verifyEmail', component: VerifyEmailUserComponent},
  { path: 'blogHome', component: EventGalleryComponent},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  { path: 'registration', component: RegistrationComponent},
  { path: 'timeline', component: ViewScheduleGalleryComponent},
  { path: 'sponsors', component: SponsorComponent },
  { path: 'overview', component: OverviewComponent },


  { path: '**', redirectTo: '/home'}
];




@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
