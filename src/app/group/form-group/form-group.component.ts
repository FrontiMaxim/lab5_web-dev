import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../models/group.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent {
  constructor(
    public groupService: GroupService,
  ) {}

  @Input() defaultData: Group | null  =  null;
  @Input() title: string = '';
  
  @Output() onSubmit = new EventEmitter<Group>();
  
  isSubmit: boolean = false;
  
  form: FormGroup = new FormGroup({});

  get name() {
    return this.form.get('name')!;
  }

  private _errorRequired = new TuiValidationError('Поле обязательно для заполнения');
 
  errorRequired (control: AbstractControl ): TuiValidationError | null {
    return (control.errors?.['required'] && this.isSubmit) ? this._errorRequired : null;
  }

  ngOnInit() {
    
    this.form = new FormGroup({
      name: new FormControl(this.defaultData?.name, Validators.required),
    });
  }

  submit() {
    this.isSubmit = true;
    
    if(!this.form.invalid) {

      const group: Group = {
        id: this.defaultData?.id,
        name: this.name.value!,
        students: this.defaultData ? this.defaultData.students : []
      }

      this.onSubmit.emit(group);
    }
  }
}
