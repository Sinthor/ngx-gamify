import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Engine {
  public gameLoop(): Observable<any> {
    return new Observable<any>((o) => {
      setInterval(() => {
        o.next();
      }, 33.33);
    });
  }
}
