import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../models/students.interface';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent {
  @Input() students: Student[] = [];
  @Output() onUpdateStudent = new EventEmitter<number>();
  @Output() onDeleteStudent = new EventEmitter<number>();
}
