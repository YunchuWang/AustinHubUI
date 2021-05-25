import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { AuthService } from '../../core/auth/auth.service';
import { ResourceService } from '../../core/resource/resource.service';
import { TipValidators } from '../custom-validators/TipValidators';
import { CategoryType } from '@core';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;
  error = '';
  visible = true;
  @Input() row: any;
  @Input() category: string;
  allCategories: any[];

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
    this.row = data;
    this.category = this.row.category;
    this.resourceService.loadCategories(CategoryType.RESC).subscribe((categories) => {
      this.allCategories = categories;
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.jobForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      phone: [null, [required, mobile]],
      title: [null, [required]],
      company: [null, [required]],
      location: [null, [required]],
      salary: [null, [required]],
      description: [null, [required]],
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

  ngOnInit(): void {}
}
