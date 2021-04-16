import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementForgotPasswordResultComponent } from './forgot-password-result.component';

describe('AccountManagementForgotPasswordResultComponent', () => {
  let component: AccountManagementForgotPasswordResultComponent;
  let fixture: ComponentFixture<AccountManagementForgotPasswordResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementForgotPasswordResultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementForgotPasswordResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
