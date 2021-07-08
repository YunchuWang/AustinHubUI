import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-agreement-form',
  templateUrl: './customer-agreement-form.component.html',
  styleUrls: ['./customer-agreement-form.component.less'],
})
export class CustomerAgreementFormComponent implements OnInit {
  lang: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.lang = data.lang;
  }

  ngOnInit(): void {}
}
