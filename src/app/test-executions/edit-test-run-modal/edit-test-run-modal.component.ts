import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Testrun } from '../testrun';

@Component({
  selector: 'app-edit-test-run-modal',
  templateUrl: './edit-test-run-modal.component.html',
  styleUrls: ['./edit-test-run-modal.component.css']
})
export class EditTestRunModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testrunChange = new EventEmitter<Testrun>();
  @Input() testrun: Testrun;
  subscription;

  constructor() {
    this.testrun = new Testrun();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestrun() {
    this.testrunChange.emit(this.testrun);
    this.testrun = new Testrun();
    // this.testrun.testcases = [];
  }

  ngOnInit() {
  }

}
