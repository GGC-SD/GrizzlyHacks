import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './application.component';
import { AuthService } from '../services/auth.service';
import { ApplicationServiceService } from '../services/application-service.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ ApplicationComponent ],
      providers: [
        AuthService,
        ApplicationServiceService,
        { provide: AngularFirestore, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
