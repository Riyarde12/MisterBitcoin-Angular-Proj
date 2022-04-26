import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  // contacts$: Observable<Contact[]>

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
