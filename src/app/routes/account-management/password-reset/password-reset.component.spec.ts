import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementPasswordResetComponent } from './password-reset.component';

describe('AccountManagementPasswordResetComponent', () => {
  let component: AccountManagementPasswordResetComponent;
  let fixture: ComponentFixture<AccountManagementPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementPasswordResetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
