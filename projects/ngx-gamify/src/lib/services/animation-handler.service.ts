import { AnimationBuilder } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CollisionObject } from '../models/CollisionObject';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private currentlyExecuting = Array<[CollisionObject, String]>();
  constructor(private builder: AnimationBuilder) {}

  public executeAnimation(
    collisionObject: CollisionObject,
    animationName: string
  ): Promise<any> {
    const animation = collisionObject.animation.find(
      (a) => a.name === animationName
    );
    const alreadyRunning = this.currentlyExecuting.find(
      (ce) => ce[0] === collisionObject && ce[1] === animationName
    );

    return new Promise((res, rej) => {
      if (animation && !alreadyRunning) {
        this.currentlyExecuting.push([collisionObject, animationName]);
        const factory = this.builder.build(animation.AnimationMetadata);
        const player = factory.create(collisionObject.elementRef.nativeElement);
        player.play();

        player.onDone(() => {
          this.currentlyExecuting = this.currentlyExecuting.filter((tuple) => {
            tuple[0] !== collisionObject && tuple[1] !== animationName;
          });
          res(true);
        });
      } else {
        rej(false);
      }
    });
  }
}
