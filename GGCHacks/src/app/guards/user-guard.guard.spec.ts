import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGuardGuard } from './user-guard.guard';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';

describe('UserGuardGuard', () => {
  let guard: UserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [UserGuardGuard, AuthService],
    });
    guard = TestBed.inject(UserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
