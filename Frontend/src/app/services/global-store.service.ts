import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  private searchGlobal = new BehaviorSubject<string>('');
  public searchGlobal$: Observable<string> = this.searchGlobal.asObservable();
  constructor() {}
  setGlobalSearch(search: string) {
    this.searchGlobal.next(search);
  }
}
