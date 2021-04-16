import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementRegisterResultComponent } from './register-result.component';

describe('AccountManagementRegisterResultComponent', () => {
  let component: AccountManagementRegisterResultComponent;
  let fixture: ComponentFixture<AccountManagementRegisterResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementRegisterResultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementRegisterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
