import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss']
})
export class ContactEditPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) { }

  contact: Contact

  async ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log('data', data.contact);
      this.contact = data.contact ? data.contact : this.contactService.getEmptyContact() as Contact
    })
  }

  onDelete(contactId: string) {
    this.contactService.deleteContact(contactId)
    this.goBack()
    // this.router.navigateByUrl('contact')
  }

  async onSaveContact() {
    await lastValueFrom(this.contactService.saveContact({ ...this.contact }))
    this.goBack()
    // this.router.navigateByUrl('contact')
  }

  goBack() {
    this.router.navigateByUrl('contact')
  }
}