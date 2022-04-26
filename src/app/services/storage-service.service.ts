import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public store(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  public load(key, defaultValue = []) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }
}
