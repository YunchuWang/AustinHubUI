import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-shopping-market',
  templateUrl: './market.component.html',
})
export class ShoppingMarketComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  ngOnInit(): void {}
}
