import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ClubSelectors } from '../../state';
import { ClubActions } from '../../state';

@Component({
  selector: 'app-club-content',
  templateUrl: './club-content.component.html',
  styleUrls: ['./club-content.component.scss']
})
export class ClubContentComponent {
  selectedClub$ = this.activatedRoute.params.pipe(
    switchMap((props) =>
      this.store.select(ClubSelectors.getClubById, { id: +props.id })
    )
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  updateItem(): void {}

  deleteItem(id: number): void {
    this.store.dispatch(ClubActions.deleteClub({ id }));
    void this.router.navigate(['/']);
  }
}
