import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothCardComponent } from './booth-card.component';

describe('BoothCardComponent', () => {
  let component: BoothCardComponent;
  let fixture: ComponentFixture<BoothCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoothCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
