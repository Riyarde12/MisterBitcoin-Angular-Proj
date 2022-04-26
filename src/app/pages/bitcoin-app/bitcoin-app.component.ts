import { Component, OnInit, OnDestroy } from '@angular/core';


import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'bitcoin-app',
  templateUrl: './bitcoin-app.component.html',
  styleUrls: ['./bitcoin-app.component.scss']
})
export class BitcoinAppComponent implements OnInit {

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

  user!: User
  // user$!: Observable<User>
  currBitcoin$!: Observable<Object> | Promise<number>


  ngOnInit(): void {

    // this.bitcoinService.getRate()
    // this.userService.loadUser()
    // this.user$ = this.userService.user$
    // this.subscription = this.user$.subscribe(user => {
    //   this.user = user
    // })
    this.user = this.userService.getUser()
    this.currBitcoin$ = this.bitcoinService.getRate(this.user.coins)
  }
}
