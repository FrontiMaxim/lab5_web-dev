import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/students.interface';
import { ModeForm } from 'src/app/shared/modeForm.enum';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-page-student',
  templateUrl: './page-student.component.html',
  styleUrls: ['./page-student.component.scss'],
})
export class PageStudentComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    public dialogService: DialogService
  ) {}

  titleForm: string = '';
  modeForm: ModeForm = ModeForm.CREATE;
 
  ngOnInit() {
    this.studentService.readAll();
  }

  submit(student: Student) {
    if(this.modeForm === ModeForm.CREATE) {
      this.studentService.create(student);
    } else if(this.modeForm === ModeForm.UPDATE) {
      this.studentService.update(student);
    }
  }

  createStudent() {
    this.modeForm = ModeForm.CREATE;
    this.titleForm = 'Добавить запись';
    this.studentService.currentStudent = null;
    this.dialogService.isOpen = true;
  }

  updateStudent(id: number) {
    this.modeForm = ModeForm.UPDATE;
    this.studentService.read(id).add(() => {
      this.titleForm = 'Редактировать запись';
      this.dialogService.isOpen = true;
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id);
  }
}
