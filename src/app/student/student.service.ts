import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/students.interface';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { DialogService } from '../shared/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
    private alertService: TuiAlertService,
    private dialogService: DialogService
  ) { }

  private _PATH = 'api/student';
  students: Student[] = [];
  currentStudent: Student | null = null;
  isLoading: boolean = false;

  readAll() {
    this.isLoading = true;
    return this.http.get<Student[]>(this._PATH).subscribe(list => {
      this.students = list;
      this.isLoading = false;
    });
  }

  read(id: number) {
    return this.http.get<Student>(`${this._PATH}/${id}`).subscribe(data => {
      this.currentStudent = data;
    });
  }

  create(data: Student) {
    return this.http.post<Student>(this._PATH, data).subscribe({
      next: (student) => {
        this.students.push(student);
        this.dialogService.isOpen = false;
        this.alertService.open(
          'Студент успешно добавлен', 
          {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
        .subscribe();
      },
      error: () => {
        this.alertService.open(
          'Студент с таким номером уже существует', 
          {label: 'Ошибка', status: TuiNotification.Error, autoClose: true})
        .subscribe();
      }
    });
  }

  delete(id: number) {
    return this.http.delete(`${this._PATH}/${id}`).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id);
      this.alertService.open(
        'Студент успешно удалён', 
        {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
      .subscribe();
    });
  }

  update(data: Student) {
    return this.http.put<Student>(this._PATH, data).subscribe({
      next: (data) => {
        this.students = this.students.map(student => student.id === data.id ? data : student);
        this.dialogService.isOpen = false;
        this.alertService.open(
          'Студент успешно отредактирован', 
          {label: 'Сообщение', status: TuiNotification.Success, autoClose: true})
        .subscribe();
      }, 
      error: () => {
        this.alertService.open(
          'Студент с таким номером уже существует', 
          {label: 'Ошибка', status: TuiNotification.Error, autoClose: true})
        .subscribe();
      }
    });
  }
}
