import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlebarService {

  private title = new BehaviorSubject('');
  currentMessage = this.title.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.title.next(message)
  }
}
