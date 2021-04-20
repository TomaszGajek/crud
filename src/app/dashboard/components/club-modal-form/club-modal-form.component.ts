import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalEnum } from '../../../core/models/modal.enum';
import { SportCategories } from '../../../core/models/sport-categories.enum';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalizationResponse } from '../../../core/models/localization-response.interface';
import { MapSearchService } from '../../../core/services/map-search.service';
import { Store } from '@ngrx/store';
import { ClubActions } from '../../state';
import { SportClub } from '../../../core/models/sport-club.interface';

@Component({
  selector: 'app-club-modal-form',
  templateUrl: './club-modal-form.component.html',
  styleUrls: ['./club-modal-form.component.scss']
})
export class ClubModalFormComponent implements OnInit {
  SportCategoriesEnum: typeof SportCategories = SportCategories;
  categories: SportCategories[] = Object.values(this.SportCategoriesEnum);
  form: FormGroup;
  options$: Observable<LocalizationResponse>;
  club: SportClub;
  title;

  constructor(
    private dialogRef: MatDialogRef<ClubModalFormComponent>,
    private formBuilder: FormBuilder,
    private mapSearchService: MapSearchService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) data: SportClub
  ) {
    this.club = data;
  }

  ngOnInit(): void {
    console.log(this.club);
    this.title = this.club ? 'Edit Club' : 'Add Club';

    this.form = this.formBuilder.group({
      name: [this.club ? this.club.name : '', Validators.required],
      category: [this.club ? this.club.category : '', Validators.required],
      description: [this.club ? this.club.description : ''],
      localization: [
        this.club ? `${this.club.lng}, ${this.club.lat}` : '',
        Validators.required
      ]
    });

    this.form.get('localization').setValue({ place_name: 'test' });

    console.log(this.form);

    this.options$ = this.form.get('localization').valueChanges.pipe(
      startWith(this.club ? `${this.club.lng}, ${this.club.lat}` : ''),
      debounceTime(500),
      distinctUntilChanged(),
      filter((value) => !!value),
      switchMap((value: string) => this.mapSearchService.querySearch(value)),
      tap((x) => console.log(x))
    );
  }

  displayFn(localization: Pick<LocalizationResponse, 'place_name'>): string {
    return localization && localization.place_name
      ? localization.place_name
      : '';
  }

  submitForm(): void {
    const club: Omit<SportClub, 'id'> = {
      name: this.form.value.name,
      category: this.form.value.category,
      description: this.form.value.description,
      lat: this.form.value.localization.geometry.coordinates[1],
      lng: this.form.value.localization.geometry.coordinates[0]
    };

    this.store.dispatch(ClubActions.addClub({ club }));
  }

  save(): void {
    this.dialogRef.close(ModalEnum.CONFIRM);
    this.submitForm();
  }

  dismiss(): void {
    this.dialogRef.close(ModalEnum.CANCEL);
  }
}
