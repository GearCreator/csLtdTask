import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(): {owners: Owner[]} {
      return {
        owners: [
          ]
      }
  }

  constructor() { }
}
