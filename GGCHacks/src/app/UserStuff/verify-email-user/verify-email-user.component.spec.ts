import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyEmailUserComponent } from './verify-email-user.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';

describe('VerifyEmailUserComponent', () => {
  let component: VerifyEmailUserComponent;
  let fixture: ComponentFixture<VerifyEmailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ VerifyEmailUserComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
