import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountMyBoothsComponent } from './my-booths.component';

describe('AccountMyBoothsComponent', () => {
  let component: AccountMyBoothsComponent;
  let fixture: ComponentFixture<AccountMyBoothsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountMyBoothsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMyBoothsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
