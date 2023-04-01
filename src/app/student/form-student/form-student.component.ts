import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Student } from '../models/students.interface';
import { GroupService } from 'src/app/group/group.service';
import { Group } from 'src/app/group/models/group.interface';
import { tuiInputDateOptionsProvider, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiDay, TuiStringHandler, TuiTime, TuiValidationError } from '@taiga-ui/cdk';

const STRINGIFY_EMPLOYEE: TuiStringHandler<Group> = (item: Group) => `${item.name}`;

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
  providers: [tuiItemsHandlersProvider({stringify: STRINGIFY_EMPLOYEE}), tuiInputDateOptionsProvider({nativePicker: true})]
})
    
export class FormStudentComponent implements OnInit {

  constructor(
    public groupService: GroupService,
  ) {}

  @Input() defaultData: Student | null  =  null;
  @Input() title: string = '';
  
  @Output() onSubmit = new EventEmitter<Student>();
  
  groups: Group[] = [];
  isSubmit: boolean = false;
  
  form: FormGroup = new FormGroup({});

  get name() {
    return this.form.get('name')!;
  }

  get birthdate() {
    return this.form.get('birthdate')!;
  }

  get number() {
    return this.form.get('number')!;
  }

  get group() {
    return this.form.get('group')!;
  }


  private _errorRequired = new TuiValidationError('Поле обязательно для заполнения');
 
  errorRequired (control: AbstractControl ): TuiValidationError | null {
    return (control.errors?.['required'] && this.isSubmit) ? this._errorRequired : null;
  }

  ngOnInit() {
    this.groupService.getAll().subscribe(list => this.groups = list);

    const date = this.defaultData?.birthdate;

    this.form = new FormGroup({
      name: new FormControl(this.defaultData?.name, Validators.required),
      birthdate: new FormControl(
         date ? TuiDay.fromLocalNativeDate(new Date(date)) : date,
        Validators.required),
      number: new FormControl(this.defaultData?.number, Validators.required),
      group: new FormControl(this.defaultData?.group)
    });
  }

  submit() {
    this.isSubmit = true;
    
    if(!this.form.invalid) {

      const student: Student = {
        id: this.defaultData?.id,
        name: this.name.value!,
        birthdate: this.birthdate.value!,
        number: this.number.value!,
        group: this.group.value!
      }

      this.onSubmit.emit(student);
    }
  }
}
