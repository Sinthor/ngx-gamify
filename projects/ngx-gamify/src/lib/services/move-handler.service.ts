import { Injectable } from '@angular/core';
import { CollisionObject } from '../models/CollisionObject';
import { Direction } from '../models/direction.enum';
import { CollisionHandler } from './collision-handler.service';

@Injectable({ providedIn: 'root' })
export class MoveHandler {
  private isMoving = false;
  private preventDirection = Array<Direction>();
  constructor(private collisionHandler: CollisionHandler) {}

  public reset(): void {
    this.isMoving = false;
    this.preventDirection = new Array<Direction>();
  }

  public moveObject(object: CollisionObject, direction: Direction): void {
    if (!this.isMoving) {
      this.isMoving = true;
      this.move(object, direction);
    }
  }

  public preventMoveTo(directions: Array<Direction>): void {
    this.preventDirection = directions;
  }

  private move(object: CollisionObject, direction: Direction): void {
    const distance = this.collisionHandler
      .detectSolidCollision(object)
      .find((c) => c.direction.includes(direction))?.distance;
    if (
      !this.preventDirection.includes(direction) &&
      (distance === undefined || (distance && distance > 0))
    ) {
      (this as any)[Direction[direction]](object, distance);
    }
    this.isMoving = false;
  }

  private UPRIGHT(object: CollisionObject, distance: number | undefined) {
    this.UP(object, distance);
    this.RIGHT(object, distance);
  }
  private RIGHTDOWN(object: CollisionObject, distance: number | undefined) {
    this.RIGHT(object, distance);
    this.DOWN(object, distance);
  }
  private DOWNLEFT(object: CollisionObject, distance: number | undefined) {
    this.DOWN(object, distance);
    this.LEFT(object, distance);
  }
  private LEFTUP(object: CollisionObject, distance: number | undefined) {
    this.LEFT(object, distance);
    this.UP(object, distance);
  }
  private UP(object: CollisionObject, distance: number | undefined): void {
    object.YPos -= distance ?? object.speed;
  }
  private RIGHT(object: CollisionObject, distance: number | undefined): void {
    object.XPos += distance ?? object.speed;
  }
  private DOWN(object: CollisionObject, distance: number | undefined): void {
    object.YPos += distance ?? object.speed;
  }
  private LEFT(object: CollisionObject, distance: number | undefined): void {
    object.XPos -= distance ?? object.speed;
  }
}
