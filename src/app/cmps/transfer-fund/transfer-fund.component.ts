import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor() { }

  @Input() contact: Contact
  @Output() onUserTransfer = new EventEmitter<object>()

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('form.value', form.value);
    this.onUserTransfer.emit(form.value as object)
  }

}
