import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move, User } from 'src/app/models/user.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss']
})
export class ContactDetailsPageComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }
  subscription: Subscription
  contact: Contact
  loggedInUser: User
  @Input() contactId: string


  async ngOnInit() {

    this.route.data.subscribe((data) => {
      this.contact = data['contact']
      // console.log('this.contact', this.contact);
    })

    this.userService.user$.subscribe(user => {
      this.loggedInUser = user
      console.log('this.loggedInUser', this.loggedInUser);
    })
  }

  goTo(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigateByUrl(`contact/edit/${this.contact._id}`)
  }

  onTransferCoins(value: object) {
    try {
      this.userService.updateUserCoins(value as object)
      this.userService.addMove(this.contact, value)
      // this.loggedInUser.moves.push(move as never)
      // this.userService.saveUser(this.loggedInUser)
    } catch (err) {
      console.log('Cannot make transaction');

    }
  }

  get getImgContact(): string {
    return `https://robohash.org/set_set5/${this.contact._id}`
  }

  onBack() {
    this.router.navigateByUrl('contact')
  }


}
