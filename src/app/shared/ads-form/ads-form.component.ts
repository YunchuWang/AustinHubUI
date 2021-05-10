import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SFSchema, SFUploadWidgetSchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AuthService } from '../../core/auth/auth.service';
import { ResourceService } from '../../core/resource/resource.service';
import { TipValidators } from '../custom-validators/TipValidators';

@Component({
  selector: 'app-ads-form',
  templateUrl: './ads-form.component.html',
  styles: [],
})
export class AdsFormComponent implements OnInit {
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
    this.row = data;
    this.category = this.row.category;
    this.resourceService.loadCategories().subscribe((categories) => {
      this.allCategories = categories;
    });

    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.adsForm = fb.group({
      name: [null, [required, minLength(3), maxLength(45)]],
      phone: [null, [required, mobile]],
      email: [null, [required, email]],
      description: [null, [required]],
      category: [null, [required]],
    });
  }
  adsForm: FormGroup;
  error = '';
  visible = true;
  row: any;
  category: string;
  allCategories: any[];

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

  isLoading(): boolean {
    return this.http.loading;
  }

  updateAds(): void {
    // call update ads and call dialog.close to reload the my resource page
    // this.dialogRef.close({event:this.action,data:this.local_data});
  }

  ngOnInit(): void {}

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
}
