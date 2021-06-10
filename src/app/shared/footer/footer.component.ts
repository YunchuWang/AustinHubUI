import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavTab } from '../../core/models/NavTab';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent implements OnInit {
  @Output() tabClicked: EventEmitter<NavTab> = new EventEmitter<NavTab>();

  constructor() {}

  ngOnInit(): void {}
}
