import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CollisionObject } from '../models/CollisionObject';

@Injectable({ providedIn: 'root' })
export class ObjectHandler {
  private collisionObjects = Array<CollisionObject>();
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  public reset(): void {
    this.collisionObjects = new Array<CollisionObject>();
  }
  public addCollisionObject(object: CollisionObject | Array<CollisionObject>) {
    if (Array.isArray(object)) {
      object.forEach((o) => {
        o.elementRef.nativeElement.style.position = 'absolute';
        o.YPos = o.elementRef.nativeElement.offsetTop;
        o.XPos = o.elementRef.nativeElement.offsetLeft;
        o.height = o.elementRef.nativeElement.offsetHeight;
        o.width = o.elementRef.nativeElement.offsetWidth;
        this.collisionObjects.push(o);
      });
    } else {
      object.elementRef.nativeElement.style.position = 'absolute';
      object.YPos = object.elementRef.nativeElement.offsetTop;
      object.XPos = object.elementRef.nativeElement.offsetLeft;
      object.height = object.elementRef.nativeElement.offsetHeight;
      object.width = object.elementRef.nativeElement.offsetWidth;
      this.collisionObjects.push(object);
    }
    console.log(this.collisionObjects);
  }

  public removeCollisionObjectByID(id: string): void {
    const co = this.collisionObjects.find((co) => co.id === id);
    if (co) {
      co.elementRef.nativeElement.remove();
      this.collisionObjects = this.collisionObjects.filter((obj) => {
        return obj.id !== id;
      });
    }
  }

  public getAllCollisionObjectsByID(id: string): Array<CollisionObject> {
    return this.collisionObjects.filter((co) => co.id === id);
  }
  public getCollisionObjectByID(id: string): CollisionObject | undefined {
    return this.collisionObjects.find((co) => co.id == id);
  }
  public getAllCollisionObjectsBySolid(): Array<CollisionObject> {
    return this.collisionObjects.filter((co) => co.solid);
  }

  public draw() {
    this.collisionObjects.forEach((co) => {
      this.renderer.setStyle(
        co.elementRef.nativeElement,
        'top',
        `${co.YPos}px`
      );
      this.renderer.setStyle(
        co.elementRef.nativeElement,
        'left',
        `${co.XPos}px`
      );
      this.renderer.setStyle(
        co.elementRef.nativeElement,
        'height',
        `${co.height}px`
      );
      this.renderer.setStyle(
        co.elementRef.nativeElement,
        'width',
        `${co.width}px`
      );
    });
  }
}
