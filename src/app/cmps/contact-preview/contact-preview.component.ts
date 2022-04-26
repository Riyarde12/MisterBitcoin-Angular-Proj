import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';


@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  @Input() contact: Contact
  @Output() onSelect = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  get getImgContact(): string {
    return `https://robohash.org/set_set5/${this.contact._id}`
  }


}
