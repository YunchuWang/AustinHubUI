import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementLoginComponent } from './login.component';

describe('AccountManagementLoginComponent', () => {
  let component: AccountManagementLoginComponent;
  let fixture: ComponentFixture<AccountManagementLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementLoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
