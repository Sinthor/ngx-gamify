import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { CurrentlyPressed } from '../models/ICurrentlyPressed';

@Injectable({ providedIn: 'root' })
export class KeyBoardHandler {
  private currentlyPressed: CurrentlyPressed = new CurrentlyPressed();
  constructor() {
    this.initialize();
  }
  private initialize() {
    fromEvent(document, 'keydown').subscribe((key) => {
      //@ts-ignore
      this.currentlyPressed[key.code] = true;
    });
    fromEvent(document, 'keyup').subscribe((key) => {
      //@ts-ignore
      this.currentlyPressed[key.code] = false;
    });
  }

  public isKeyPressed(): CurrentlyPressed {
    return this.currentlyPressed;
  }
}
