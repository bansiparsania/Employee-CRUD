import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      contact: 0,
      userName: '',
      password: '',
      action:'',
    });
  
  }
  errorMessage: string = '';

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              this.handleApiError(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.handleApiError(err);
          },
        });
      }
    }
  }


  handleApiError(error: any) {
    if (error.status === 400 && error.error) {
      const validationErrors = error.error;
      this.errorMessage = '';
  
      for (const fieldName in validationErrors) {
        if (validationErrors.hasOwnProperty(fieldName)) {
          const fieldErrors = validationErrors[fieldName];
          this.errorMessage += `${fieldName} ${fieldErrors.join(',')} `;
        }
      }
    }
  }
}


