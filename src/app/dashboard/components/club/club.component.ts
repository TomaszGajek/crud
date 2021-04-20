import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { SportClub } from '../../../core/models/sport-club.interface';
import { Localization } from '../../../core/models/localization.interface';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClubComponent {
  @Input() club: SportClub;
  @Output()
  selectedClub: EventEmitter<Localization> = new EventEmitter<Localization>();

  selectClub(lng: number, lat: number): void {
    this.selectedClub.emit({ lng, lat });
  }
}
