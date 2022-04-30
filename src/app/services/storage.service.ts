'use strict';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  public saveToStorage(key: string, val: [] | {}) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
  }

  public loadFromStorage(key: string) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str);
    return val;
  }

  public removedFromStorage(key: string) {
    localStorage.removeItem(key);
  }
}
