import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailActionComponent } from './email-action.component';

describe('EmailActionComponent', () => {
  let component: EmailActionComponent;
  let fixture: ComponentFixture<EmailActionComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ EmailActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
