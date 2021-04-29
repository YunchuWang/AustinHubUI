import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothFormComponent } from './booth-form.component';

describe('BoothFormComponent', () => {
  let component: BoothFormComponent;
  let fixture: ComponentFixture<BoothFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoothFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
