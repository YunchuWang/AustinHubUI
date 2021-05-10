import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AuthService } from '../../core/auth/auth.service';
import { ResourceService } from '../../core/resource/resource.service';
import { TipValidators } from '../custom-validators/TipValidators';

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
    this.row = data;
    this.category = this.row.category;
    this.resourceService.loadCategories().subscribe((categories) => {
      this.allCategories = categories;
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.boothForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      phone: [null, [required, mobile]],
      email: [null, [required, email]],
      description: [null, [required]],
      category: [null, [required]],
    });
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  updateBooth(): void {
    // call update booth and call dialog.close to reload the my resource page
    // this.dialogRef.close({event:this.action,data:this.local_data});
  }
}
