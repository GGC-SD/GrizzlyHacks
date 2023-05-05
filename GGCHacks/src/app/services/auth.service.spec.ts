import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ApplicationServiceService } from './application-service.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [AuthService, ApplicationServiceService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
