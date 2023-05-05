import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyEmailComponent } from './verify-email.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
      ],
      declarations: [ VerifyEmailComponent ],
      providers: [
        AngularFireAuth,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                oobCode: 'testCode',
              },
            },
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
