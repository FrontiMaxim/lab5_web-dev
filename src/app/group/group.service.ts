import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from './models/group.interface';
import { Observable } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { DialogService } from '../shared/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private alertService: TuiAlertService,
    private dialogService: DialogService
  ) { }

  private _PATH = 'api/group';

  groups: Group[] = [];
  currentGroup: Group | null = null;
  isLoading: boolean = false;

  readAll() {
    this.isLoading = true;
    return this.http.get<Group[]>(this._PATH).subscribe(list => {
      this.groups = list;
      this.isLoading = false;
    });
  }

  read(id: number) {
    return this.http.get<Group>(`${this._PATH}/${id}`).subscribe(data => {
      this.currentGroup = data;
    });
  }

  create(data: Group) {
    return this.http.post<Group>(this._PATH, data).subscribe({
      next: (student) => {
        this.groups.push(student);
        this.dialogService.isOpen = false;
        this.alertService.open(
            'Группа успешно добавлена', 
            {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
          .subscribe();
      },
      error: () => {
        this.alertService.open(
            'Группа с таким названием уже существует', 
            {label: 'Ошибка', status: TuiNotification.Error, autoClose: true})
          .subscribe();
      },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this._PATH}/${id}`).subscribe(() => {
      this.groups = this.groups.filter(group => group.id !== id);
      this.alertService.open(
        'Группа успешно удалена', 
        {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
        .subscribe();
    });
  }

  update(data: Group) {
    return this.http.put<Group>(this._PATH, data).subscribe({
      next: (data) => {
        this.groups = this.groups.map(group => group.id === data.id ? data : group);
        this.dialogService.isOpen = false;
        this.alertService.open(
          'Группа успешно отредактирована', 
          {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
          .subscribe();
      },
      error: () => {
        this.alertService.open(
            'Группа с таким названием уже существует', 
            {label: 'Ошибка', status: TuiNotification.Error, autoClose: true})
          .subscribe();
      }
    });
  }
}
