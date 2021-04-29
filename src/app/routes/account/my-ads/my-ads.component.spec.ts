import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountMyAdsComponent } from './my-ads.component';

describe('AccountMyAdsComponent', () => {
  let component: AccountMyAdsComponent;
  let fixture: ComponentFixture<AccountMyAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountMyAdsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMyAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
