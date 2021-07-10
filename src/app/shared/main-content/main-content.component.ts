import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.less'],
})
export class MainContentComponent implements OnInit {
  @ViewChild('maincontentdiv', { static: false }) public myScrollContainer2: ElementRef;
  scrolled = false;

  constructor() {}

  ngOnInit(): void {}

  onScroll(): void {
    this.scrolled = this.myScrollContainer2.nativeElement.scrollTop > 20;
  }

  scrollToTop(): void {
    this.myScrollContainer2.nativeElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
