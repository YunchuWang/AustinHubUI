import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService, CategoryType, MyResourceType, ResourceService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash-es';
import { Category } from '../../core/models/Category';
import { TipValidators } from '../custom-validators/TipValidators';

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
  persist = false;

  constructor(
    private http: _HttpClient,
    private authService: AuthService,
    private resourceService: ResourceService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.row = data.resource;
    this.persist = data.persist;
    this.category = this.row.category;
    this.resourceService.loadCategories(CategoryType.RESC).subscribe((categories: Category[]) => {
      this.allCategories = categories.filter((c) => c.name !== 'all');
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.boothForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      address: [null, [required, minLength(3), maxLength(45)]],
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

    console.log(this.row);
    if (this.persist) {
      this.resourceService.updateResource(MyResourceType.BOOTHS, this.row).subscribe((res) => {
        console.log('Updated');
      });
      return;
    }

    this.row.valid = true;
    this.saved.emit();
  }
}
