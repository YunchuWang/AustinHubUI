import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnectionService } from '@core';
import { TipValidators } from '../custom-validators/TipValidators';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styles: [],
})
export class ContactUsFormComponent implements OnInit {
  contactForm: FormGroup;
  contactFormData: any;
  disabledSubmitButton = true;
  optionsSelect: Array<any>;
  allSubjects: any[];

  constructor(private fb: FormBuilder, private connectionService: ConnectionService) {
    const { required, maxLength, minLength, email, mobile } = TipValidators;
    this.contactForm = fb.group({
      accountName: [null, [required, maxLength(45)]],
      email: [null, [required, email]],
      subject: [null, required],
      message: [null, [required, maxLength(500)]],
    });

    this.contactFormData = {
      accountName: null,
      email: null,
      subject: null,
      message: null,
    };

    this.allSubjects = [
      { name: 'Feedback', displayName: 'Feedback' },
      { name: 'Report a bug', displayName: 'Report a bug' },
      { name: 'Feature request', displayName: 'Feature request' },
    ];
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.contactForm.value);
    this.connectionService.sendContactEmail(this.contactForm.value).subscribe(
      () => {
        this.contactForm.reset();
        this.disabledSubmitButton = true;
      },
      (error) => {
        console.log('Error', error);
      },
    );
  }

  onSubjectChange(event: any): void {
    this.contactFormData.subject = event;
  }
}
