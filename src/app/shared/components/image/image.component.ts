import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() imgSrc = '/assets/watchmen.png';
  @Input() altTxt = 'Test Text';
  @Input() figCaptionTxt?: 'Test Caption';
  @Input() imgOpacity? = 1;
}
