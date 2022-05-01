import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';


@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  @Input() contact: Contact


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo() {
    console.log('Clicked');

    this.router.navigateByUrl(`/contact/details/${this.contact._id}`)
  }

  get getImgContact(): string {
    return `https://robohash.org/set_set5/${this.contact._id}`
  }


}
