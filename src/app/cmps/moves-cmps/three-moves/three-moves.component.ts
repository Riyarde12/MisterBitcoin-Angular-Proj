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


  // _ = require('lodash');

  @Input() moves: Move[]

  threeMoves: Move[]
  subscription: Subscription

  ngOnInit(): void {
    this.subscription = this.userservice.user$.subscribe(user => {
      this.threeMoves = user.moves.splice(0, 3)
    })

  }

  // lastThreeMove() {
  //   this.threeMoves = this.moves.splice(0, 3)

  //   // console.log('threeMoves', threeMoves);
  //   return this.threeMoves
  // }


}
