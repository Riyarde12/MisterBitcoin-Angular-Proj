import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss']
})
export class ContactDetailsPageComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  subscription: Subscription
  contact: Contact
  @Input() contactId: string


  async ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.contact = data['contact']
    // })

    this.route.data.subscribe((data) => {
      this.contact = data['contact']
    })
    // this.route.params.subscribe(async params => {
    //   // const contact = await this.contactService.getContactById(params.id).toPromise()
    //   const contact = await lastValueFrom(this.contactService.getContactById(params.id))
    //   this.contact = contact
    // })

    // this.route.params.pipe(switchMap((params) => this.contactService.getContactById(params['id']))).subscribe(contact => {
    //   this.contact = contact
    // })
  }

  goTo(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigateByUrl(`contact/edit/${this.contact._id}`)
  }

  onBack() {
    this.router.navigateByUrl('contact')
  }

}
