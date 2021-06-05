import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryType } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash-es';
import { AuthService } from '../../core/auth/auth.service';
import { ResourceService } from '../../core/resource/resource.service';
import { TipValidators } from '../custom-validators/TipValidators';
import { ResourceEditFormComponent } from '@shared';

@Component({
  selector: 'app-booth-form',
  templateUrl: './booth-form.component.html',
  styles: [],
})
export class BoothFormComponent implements OnInit {
  boothForm: FormGroup;
  error = '';
  visible = true;
  @Input() row: any;
  @Input() category: string;
  @Output() saved = new EventEmitter<any>();
  allCategories: any[];
  formData: any;

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
    this.row = data.resource;
    this.category = this.row.category;
    this.resourceService.loadCategories(CategoryType.RESC).subscribe((categories) => {
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

  ngOnInit(): void {
    this.formData = _.cloneDeep(this.row);
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  onCategoryChange(event: any): void {
    this.formData.category = event;
  }

  save(): void {
    Object.keys(this.formData).forEach((key) => {
      this.row[key] = this.formData[key];
    });

    this.row.valid = true;
    this.saved.emit();
  }
}
