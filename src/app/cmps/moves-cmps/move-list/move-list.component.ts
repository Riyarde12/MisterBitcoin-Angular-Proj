import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/user.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  constructor() { }

  @Input() moves: Move[]

  ngOnInit(): void {

  }

}
