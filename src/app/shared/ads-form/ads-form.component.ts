import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService, CategoryType, MyResourceType, ResourceService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SFSchema, SFUploadWidgetSchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Category } from '../../core/models/Category';
import { TipValidators } from '../custom-validators/TipValidators';

@Component({
  selector: 'app-ads-form',
  templateUrl: './ads-form.component.html',
  styles: [],
})
export class AdsFormComponent implements OnInit {
  adsForm: FormGroup;
  error = '';
  visible = true;
  formData: any;
  @Input() row: any;
  @Input() category: string;
  @Output() saved = new EventEmitter<any>();

  allCategories: Category[];
  persist = false;
  schema: SFSchema = {
    properties: {
      file: {
        type: 'string',
        title: '单个文件',
        ui: {
          widget: 'upload',
          action: '/upload',
          resReName: 'resource_id',
          urlReName: 'url',
        } as SFUploadWidgetSchema,
      },
    },
  };

  constructor(
    private http: _HttpClient,
    private authService: AuthService,
    private resourceService: ResourceService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private msg: NzMessageService,
    fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AdsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.row = data.resource;
    this.persist = data.persist;
    this.category = this.row.category;
    this.resourceService.loadCategories(CategoryType.RESC).subscribe((categories: Category[]) => {
      this.allCategories = categories.filter((c) => c.name !== 'all');
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.adsForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      phone: [null, [required, mobile]],
      email: [null, [required, email]],
      description: [null, [required, maxLength(350)]],
      category: [null, [required]],
    });
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  updateAds(): void {
    // call update ads and call dialog.close to reload the my resource page
    // this.dialogRef.close({event:this.action,data:this.local_data});
  }

  ngOnInit(): void {
    this.formData = _.cloneDeep(this.row);
  }

  submit(value: unknown): void {
    this.msg.success(JSON.stringify(value));
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  save(): void {
    Object.keys(this.formData).forEach((key) => {
      this.row[key] = this.formData[key];
    });

    if (this.persist) {
      this.resourceService.updateResource(MyResourceType.ADS, this.row).subscribe((res) => {
        console.log('Updated');
      });
      return;
    }

    this.row.valid = true;
    this.saved.emit();
  }

  onCategoryChange(event: any): void {
    this.formData.category = event;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
