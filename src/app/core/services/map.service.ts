import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { SportClub } from '../models/sport-club.interface';
import { Localization } from '../models/localization.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: mapboxgl.Map;
  private popup: mapboxgl.Popup;
  private style = 'mapbox://styles/mapbox/streets-v11';

  constructor(private router: Router) {}

  init(
    lng: number,
    lat: number,
    zoom: number,
    container: string,
    items: SportClub[]
  ): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container,
      style: this.style,
      zoom,
      center: [lng, lat]
    });

    console.log('init');

    this.createMarkers(items);
    this.createPopups();
  }

  createMarkers(items: SportClub[]): void {
    this.map.on('load', () => {
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: items.map((item) => ({
            type: 'Feature',
            properties: {
              id: item.id,
              description: `<strong>${item.name}</strong><p>${item.description}</p>`
            },
            geometry: {
              type: 'Point',
              coordinates: [item.lng, item.lat]
            }
          }))
        }
      });

      this.map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
    });
  }

  createPopups(): void {
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.handleMarkerMouseEnterEvent();
    this.handleMarkerMouseLeaveEvent();
    this.handleMarkerClickEvent();
  }

  flyToSelectedPoint({ lng, lat }: Localization): void {
    this.map.fire('flyend');
    this.map.flyTo({
      center: [lng, lat],
      zoom: 10
    });
  }

  handleMarkerMouseEnterEvent(): void {
    this.map.on('mouseenter', 'places', (e) => {
      const coordinates: Localization = e.lngLat;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const description: string = e.features[0].properties.description;

      this.map.getCanvas().style.cursor = 'pointer';
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      this.popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
    });
  }

  handleMarkerMouseLeaveEvent(): void {
    this.map.on('mouseleave', 'places', () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
    });
  }

  handleMarkerClickEvent(): void {
    this.map.on(
      'click',
      'places',
      (e) => void this.router.navigate(['', e.features[0].properties.id])
    );
  }
}
