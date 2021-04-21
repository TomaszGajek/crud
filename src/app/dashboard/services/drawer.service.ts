import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private subject: Subject<boolean> = new Subject<boolean>();

  setDrawerClosed(status: boolean): void {
    this.subject.next(status);
  }

  getDrawerState(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
