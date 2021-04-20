import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SportCategories } from '../../../core/models/sport-categories.enum';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalizationResponse } from '../../../core/models/localization-response.interface';
import { MapSearchService } from '../../../core/services/map-search.service';
import { Store } from '@ngrx/store';
import { SportClub } from '../../../core/models/sport-club.interface';
import { ClubActions } from '../../state';

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
    this.createForm();
    this.title = this.club ? 'Edit Club' : 'Add Club';

    this.options$ = this.form.get('localization').valueChanges.pipe(
      startWith(
        this.club
          ? `${this.club.localization.center[0]}, ${this.club.localization.center[1]}`
          : ''
      ),
      debounceTime(500),
      distinctUntilChanged(),
      filter((value) => !!value),
      switchMap((value: string) => this.mapSearchService.querySearch(value))
    );
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [this.club ? this.club.name : '', Validators.required],
      category: [this.club ? this.club.category : '', Validators.required],
      description: [this.club ? this.club.description : ''],
      localization: ['', Validators.required]
    });

    if (this.club) {
      this.form
        .get('localization')
        .setValue({ place_name: this.club.localization.place_name });
    }
  }

  displayFn(localization: Pick<LocalizationResponse, 'place_name'>): string {
    return localization && localization.place_name
      ? localization.place_name
      : '';
  }

  submitForm(): void {
    const {
      name,
      category,
      description
    }: Pick<SportClub, 'name' | 'category' | 'description'> = this.form.value;
    const {
      place_name,
      center
    }: { place_name: string; center: number[] } = this.form.value.localization;

    const club: Omit<SportClub, 'id'> = {
      name,
      category,
      description,
      localization: {
        place_name,
        center
      }
    };

    this.store.dispatch(ClubActions.addClub({ club }));
  }

  save(): void {
    this.submitForm();
    this.dialogRef.close(null);
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
