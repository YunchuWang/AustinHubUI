import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styles: [],
})
export class ResourceEditFormComponent implements OnInit {
  resourceItems: any[];
  constructor(public dialogRef: MatDialogRef<ResourceEditFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.resourceItems = data.resource;
    console.log(this.resourceItems);
  }

  ngOnInit(): void {}
}
