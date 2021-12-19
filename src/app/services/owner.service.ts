import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private httpClient: HttpClient) { }

  lastId = 1

  getOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(`api/owners`)
  }

  getOwnerById(ownerId: number): Observable<Owner>{
    return this.httpClient.get<Owner>(`api/owners/${ownerId}`)
  }

  addOwner(body: Owner): Observable<Owner> {
    return this.httpClient.post<Owner>(`api/owners`, body)
  }

  editOwner(body: Owner): Observable<Owner> {
    return this.httpClient.put<Owner>(`api/owners`, body)
  }

  deleteOwner(ownerId: number): Observable<Owner[]> {
    return this.httpClient.delete<Owner[]>(`api/owners/${ownerId}`)
  }
}
