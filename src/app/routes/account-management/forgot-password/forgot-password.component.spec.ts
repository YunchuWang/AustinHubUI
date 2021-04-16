import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementForgotPasswordComponent } from './forgot-password.component';

describe('AccountManagementForgotPasswordComponent', () => {
  let component: AccountManagementForgotPasswordComponent;
  let fixture: ComponentFixture<AccountManagementForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementForgotPasswordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
