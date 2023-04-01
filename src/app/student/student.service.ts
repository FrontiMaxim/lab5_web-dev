import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/students.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

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
    return this.http.post<Student>(this._PATH, data).subscribe(student => {
      this.students.push(student);
    });
  }

  delete(id: number) {
    return this.http.delete(`${this._PATH}/${id}`).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id)
    });
  }

  update(data: Student) {
    return this.http.put<Student>(this._PATH, data).subscribe(data => {
      this.students = this.students.map(student => student.id === data.id ? data : student)
    });
  }
}
