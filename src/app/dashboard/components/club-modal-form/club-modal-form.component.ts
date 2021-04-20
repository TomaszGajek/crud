import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalEnum } from '../../../core/models/modal.enum';
import { SportCategories } from '../../../core/models/sport-categories.enum';

@Component({
  selector: 'app-club-modal-form',
  templateUrl: './club-modal-form.component.html',
  styleUrls: ['./club-modal-form.component.scss']
})
export class ClubModalFormComponent implements OnInit {
  SportCategoriesEnum: typeof SportCategories = SportCategories;
  categories: SportCategories[] = Object.values(this.SportCategoriesEnum);
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClubModalFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ''
    });
  }

  submitForm(): void {
    console.log(this.form.value);
  }

  save(): void {
    this.dialogRef.close(ModalEnum.CONFIRM);
    this.submitForm();
  }

  dismiss(): void {
    this.dialogRef.close(ModalEnum.CANCEL);
  }
}
