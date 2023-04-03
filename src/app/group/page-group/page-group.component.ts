import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { ModeForm } from 'src/app/shared/modeForm.enum';
import { Group } from '../models/group.interface';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-page-group',
  templateUrl: './page-group.component.html',
  styleUrls: ['./page-group.component.scss']
})
export class PageGroupComponent implements OnInit {
  constructor(
    public groupService: GroupService,
    public dialogService: DialogService
  ) {}
  
  titleForm: string = '';
  modeForm: ModeForm = ModeForm.CREATE;
 
  ngOnInit() {
    this.groupService.readAll();
  }

  submit(group: Group) {
    if(this.modeForm === ModeForm.CREATE) {
      this.groupService.create(group);
    } else if(this.modeForm === ModeForm.UPDATE) {
      this.groupService.update(group);
    }
  }

  createGroup() {
    this.modeForm = ModeForm.CREATE;
    this.titleForm = 'Добавить запись';
    this.groupService.currentGroup = null;
    this.dialogService.isOpen = true;
  }

  updateGroup(id: number) {
    this.modeForm = ModeForm.UPDATE;
    this.groupService.read(id).add(() => {
      this.titleForm = 'Редактировать запись';
      this.dialogService.isOpen = true;
    });
  }

  deleteGroup(id: number) {
    this.groupService.delete(id);
  }
}
