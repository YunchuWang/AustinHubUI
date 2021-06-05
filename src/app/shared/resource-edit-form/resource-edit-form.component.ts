import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingService } from '@core';

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styles: [],
})
export class ResourceEditFormComponent implements OnInit {
  resourceItems: any[];
  saveChecks: any[];
  shoppingIndex: number;

  constructor(
    public shoppingService: ShoppingService,
    public dialogRef: MatDialogRef<ResourceEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.resourceItems = data.resource;
    this.shoppingIndex = data.index;
    this.saveChecks = new Array(this.resourceItems.length).fill(false);
  }

  ngOnInit(): void {}

  onSave(index: any): void {
    this.saveChecks[index] = true;

    if (this.resourceItems.every((resourceItem) => resourceItem.valid)) {
      this.shoppingService.shoppingItems[this.shoppingIndex].valid = true;
    }
  }

  close(event: any): void {
    this.dialogRef.close();
  }
}
