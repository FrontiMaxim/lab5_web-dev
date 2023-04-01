import { Component, Input } from '@angular/core';
import { Group } from '../models/group.interface';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {
  @Input() data: Group = {} as Group;
}
