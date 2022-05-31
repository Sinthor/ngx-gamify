import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { MoveHandler } from './move-handler.service';
import { ObjectHandler } from './object-handler.service';

@Injectable({ providedIn: 'root' })
export class SceneHandler {
  private container: ViewContainerRef;
  private currentScene: ComponentRef<any>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private objectHandler: ObjectHandler,
    private moveHandler: MoveHandler
  ) {}

  public addContainer(container: ViewContainerRef) {
    this.container = container;
  }
  public loadComponentScene(component: any): void {
    if (this.currentScene) {
      this.currentScene.destroy();
      this.objectHandler.reset();
      this.moveHandler.reset();
    }
    // create the component factory
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    // add the component to the view
    this.currentScene = this.container.createComponent(dynamicComponentFactory);
  }
}
