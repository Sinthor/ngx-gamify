import { Injectable } from '@angular/core';
import { CollisionObject } from '../models/CollisionObject';
import { Direction } from '../models/direction.enum';
import { ObjectHandler } from './object-handler.service';

@Injectable({ providedIn: 'root' })
export class CollisionHandler {
  constructor(private objectHandler: ObjectHandler) {}

  public detectSolidCollision(
    object: CollisionObject
  ): Array<{ direction: Direction[]; distance: number }> {
    let directions: Array<{ direction: Direction[]; distance: number }> = [];
    this.objectHandler.getAllCollisionObjectsBySolid().forEach((cobj) => {
      // Check in a rectangle around the object for possible collisions, return distance to collision
      for (let d = 0; d <= object.speed; d++) {
        const direction = this.checkSolidCollision(
          object?.XPos - d,
          object?.YPos - d,
          object?.width + d * 2,
          object?.height + d * 2,
          cobj.XPos,
          cobj.YPos,
          cobj.width,
          cobj.height
        );
        const distance = direction ? d : 0;
        directions.push({ direction, distance });
      }
    });

    return directions;
  }

  public detectCollision(
    collisionObject1: CollisionObject,
    collisionObjectID: string
  ): boolean {
    const collisionObject2 = this.objectHandler.getCollisionObjectByID(
      collisionObjectID
    );
    if (collisionObject2) {
      return this.rectIntersect(
        collisionObject1?.XPos,
        collisionObject1?.YPos,
        collisionObject1?.width,
        collisionObject1?.height,
        collisionObject2.XPos,
        collisionObject2.YPos,
        collisionObject2.width,
        collisionObject2.height
      );
    } else return false;
  }

  public detectCollisionWithIDs(
    collisionObject1: CollisionObject,
    collisionObjectID: string
  ): boolean {
    return this.objectHandler
      .getAllCollisionObjectsByID(collisionObjectID)
      .some((cobj) => {
        this.rectIntersect(
          collisionObject1?.XPos,
          collisionObject1?.YPos,
          collisionObject1?.width,
          collisionObject1?.height,
          cobj.XPos,
          cobj.YPos,
          cobj.width,
          cobj.height
        );
      });
  }

  public checkSolidCollision(
    x1: any,
    y1: any,
    w1: any,
    h1: any,
    x2: any,
    y2: any,
    w2: any,
    h2: any
  ) {
    // left side of "wall"
    if (x1 + w1 === x2) {
      if (
        (y1 >= y2 && y1 <= y2 + h2) ||
        (y1 + h1 >= y2 && y1 + h1 <= y2 + h2) ||
        (y1 <= y2 && y1 + h1 > y2 + h2)
      ) {
        return [Direction.RIGHT, Direction.RIGHTDOWN, Direction.UPRIGHT];
      }
    }

    // right side of "wall"
    if (x1 === x2 + w2) {
      if (
        (y1 >= y2 && y1 <= y2 + h2) ||
        (y1 + h1 >= y2 && y1 + h1 <= y2 + h2) ||
        (y1 <= y2 && y1 + h1 > y2 + h2)
      ) {
        return [Direction.LEFT, Direction.DOWNLEFT, Direction.LEFTUP];
      }
    }

    // upper side of "wall"
    if (y1 + h1 === y2) {
      if (
        (x1 >= x2 && x1 <= x2 + w2) ||
        (x1 + w1 >= x2 && x1 + w1 <= x2 + w2) ||
        (x1 <= x2 && x1 + h1 > x2 + w2)
      ) {
        return [Direction.DOWN, Direction.DOWNLEFT, Direction.RIGHTDOWN];
      }
    }

    // lower side of "wall"
    if (y1 === y2 + h2) {
      if (
        (x1 >= x2 && x1 <= x2 + w2) ||
        (x1 + w1 >= x2 && x1 + w1 <= x2 + w2) ||
        (x1 <= x2 && x1 + h1 > x2 + w2)
      ) {
        return [Direction.UP, Direction.UPRIGHT, Direction.LEFTUP];
      }
    }

    return [];
  }

  rectIntersect(
    x1: any,
    y1: any,
    w1: any,
    h1: any,
    x2: any,
    y2: any,
    w2: any,
    h2: any
  ) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    }
    return true;
  }
}
