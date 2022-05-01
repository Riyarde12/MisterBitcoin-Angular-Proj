import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, OnDestroy {

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  subscription: Subscription

  contacts: Contact[]
  selectedContactId: string

  ngOnInit(): void {
    this.contactService.loadContacts()
    this.subscription = this.contactService.contacts$.subscribe(contacts => this.contacts = contacts)
  }

  moveTo() {
    this.router.navigateByUrl('/contact/edits')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
