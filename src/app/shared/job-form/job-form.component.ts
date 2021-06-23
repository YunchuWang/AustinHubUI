import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryType, MyResourceType } from '@core';
import { AuthService } from '@core';
import { ResourceService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash-es';
import { Category } from '../../core/models/Category';
import { TipValidators } from '../custom-validators/TipValidators';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;
  error = '';
  visible = true;
  persist = false;
  @Input() row: any;
  @Input() category: string;
  @Output() saved = new EventEmitter<any>();
  formData: any;
  allCategories: Category[];

  constructor(
    private http: _HttpClient,
    private authService: AuthService,
    private resourceService: ResourceService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<JobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.row = data.resource;
    this.persist = data.persist;
    this.category = this.row.category;
    this.resourceService.loadCategories(CategoryType.RESC).subscribe((categories) => {
      this.allCategories = categories;
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.jobForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      phone: [null, [required, mobile]],
      address: [null, [required]],
      salary: [null, [required]],
      description: [null, [required]],
      contact: [null, [required]],
      category: [null, [required]],
    });
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  updateJob(): void {
    // call update booth and call dialog.close to reload the my resource page
    // this.dialogRef.close({event:this.action,data:this.local_data});
  }

  ngOnInit(): void {
    this.formData = _.cloneDeep(this.row);
  }

  onCategoryChange(event: any): void {
    this.formData.category = event;
  }

  save(): void {
    Object.keys(this.formData).forEach((key) => {
      this.row[key] = this.formData[key];
    });

    if (this.persist) {
      this.resourceService.updateResource(MyResourceType.JOBS, this.row).subscribe((res) => {
        console.log('Updated');
      });
      return;
    }

    this.row.valid = true;
    this.saved.emit();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
