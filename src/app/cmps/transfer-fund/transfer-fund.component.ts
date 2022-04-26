import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor() { }

  @Output() onUserMove = new EventEmitter<number>()

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('form.value', form.value);
    this.onUserMove.emit(form.value)
  }

}
