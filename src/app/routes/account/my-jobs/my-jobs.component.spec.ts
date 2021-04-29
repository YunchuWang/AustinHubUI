import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountMyJobsComponent } from './my-jobs.component';

describe('AccountMyJobsComponent', () => {
  let component: AccountMyJobsComponent;
  let fixture: ComponentFixture<AccountMyJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountMyJobsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
