import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent {
  city: string[] = [
    'Andhra Pradesh ',
    'Arunachal Pradesh ',
    'Assam ',
    'Bihar ',
    'Chhattisgarh ',
    'Gujarat ',
    'Haryana ',
    'Himachal Pradesh ',
    'Jammu and Kashmir ',
    'Goa ',
    'Jharkhand ',
    'Karnataka ',
    'Kerala ',
    'Madhya Pradesh ',
    'Maharashtra ',
    'Manipur ',
    'Meghalaya ',
    'Mizoram ',
    'Nagaland ',
    'Odisha ',
    'Punjab ',
    'Rajasthan ',
    'Sikkim ',
    'Tamil Nadu ',
    'Telangana ',
    'Tripura ',
    'Uttarakhand ',
    'Uttar Pradesh ',
    'West Bengal ',
    'Andaman and Nicobar Islands ',
    'Chandigarh ',
    'Dadra and Nagar Haveli ',
    'Daman and Diu ',
    'Delhi ',
    'Lakshadweep ',
    'Puducherry ',
  ]

  feedbackForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _feedBackService: FeedbackService,
    private _DialogRef: MatDialogRef<FeedbackFormComponent>,
    private _coreService: CoreService,

  ) {
    this.feedbackForm = this._fb.group({
      name: '',
      email: '',
      phone: '',
      location: '',
      service: '',
      suggestion: '',
    })
  }

  onFeedbackSubmit() {
    if (this.feedbackForm.valid) {
      this._feedBackService.addFeedback(this.feedbackForm.value).subscribe({
        next: (value: any) => {
          this._coreService.openSnackBar('Succesfully Submited', 'Done');
          this._DialogRef.close(true);
        }, error: (err: any) => {
          console.error(err);
        },
      })
    }
  }

}
