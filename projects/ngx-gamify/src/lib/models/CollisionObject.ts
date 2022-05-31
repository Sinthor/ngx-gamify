import { ElementRef } from '@angular/core';
import { Animation } from './Animation';

export class CollisionObject {
  public elementRef: ElementRef;
  public YPos: number = 0;
  public XPos: number = 0;
  public width: number = 0;
  public height: number = 0;
  public id: string;
  public solid: boolean;
  public animation: Array<Animation>;
  speed: number = 15;
}
