import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementPasswordResetResultComponent } from './password-reset-result.component';

describe('AccountManagementPasswordResetResultComponent', () => {
  let component: AccountManagementPasswordResetResultComponent;
  let fixture: ComponentFixture<AccountManagementPasswordResetResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementPasswordResetResultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementPasswordResetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
