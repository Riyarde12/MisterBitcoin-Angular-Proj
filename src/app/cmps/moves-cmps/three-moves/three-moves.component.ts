import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'three-moves',
  templateUrl: './three-moves.component.html',
  styleUrls: ['./three-moves.component.scss']
})
export class ThreeMovesComponent implements OnInit {

  constructor(private userservice: UserService) { }

  @Input() moves: Move[]

  threeMoves: Move[]
  subscription: Subscription

  ngOnInit(): void {
    this.subscription = this.userservice.user$.subscribe(user => {
      this.threeMoves = user.moves.length > 3 ? user.moves.slice(0, 3) : user.moves.slice()
    })
  }
}
