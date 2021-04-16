import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementRegisterComponent } from './register.component';

describe('AccountManagementRegisterComponent', () => {
  let component: AccountManagementRegisterComponent;
  let fixture: ComponentFixture<AccountManagementRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementRegisterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
