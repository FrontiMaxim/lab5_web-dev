import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-page-group',
  templateUrl: './page-group.component.html',
  styleUrls: ['./page-group.component.scss']
})
export class PageGroupComponent implements OnInit {
  constructor(
    private groupService: GroupService
  ) {}

  ngOnInit() {
    
  }
}
