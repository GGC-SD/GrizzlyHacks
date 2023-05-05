import { Injectable } from '@angular/core';
import {Application} from '../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  app: Application = new Application();

  constructor() {
  }

  setApp(application: Application) {
    this.app = application;
  }

  createEmptyApp() {
    this.app = new Application();
    console.log('create empty ' + JSON.stringify(this.app));
  }

}
