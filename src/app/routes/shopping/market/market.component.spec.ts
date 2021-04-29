import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingMarketComponent } from './market.component';

describe('ShoppingMarketComponent', () => {
  let component: ShoppingMarketComponent;
  let fixture: ComponentFixture<ShoppingMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingMarketComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
