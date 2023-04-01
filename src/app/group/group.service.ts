import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from './models/group.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private _PATH = 'api/group';

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this._PATH);
  }

  get(id: number): Observable<Group> {
    return this.http.get<Group>(`${this._PATH}/${id}`);
  }
}
