import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { SportClub } from '@core/models/sport-club.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  @Input() set clubs(value: SportClub[]) {
    if (value.length > 0) {
      this.mapService.init(19.476951, 52.168837, 5, 'map', value);
    }
  }
  constructor(private mapService: MapService) {}
}
