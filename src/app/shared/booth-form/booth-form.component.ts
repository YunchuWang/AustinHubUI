import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { AuthService } from '../../core/auth/auth.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourceService } from '../../core/resource/resource.service';

@Component({
  selector: 'app-booth-form',
  templateUrl: './booth-form.component.html',
  styles: [],
})
export class BoothFormComponent {
  boothForm: FormGroup;
  error = '';
  visible = true;
  row: any;
  category: string;
  allCategories: any[];

  constructor(
    private http: _HttpClient,
    private authService: AuthService,
    private resourceService: ResourceService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<BoothFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data.category);
    this.row = data;
    this.category = this.row.category;
    this.resourceService.loadCategories().subscribe((categories) => {
      this.allCategories = categories;
    });

    this.boothForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      phone: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required, Validators.minLength(6)]],
      category: [null, [Validators.required]],
    });
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  updateBooth() {
    // call update booth and call dialog.close to reload the my resource page
    // this.dialogRef.close({event:this.action,data:this.local_data});
  }
}
