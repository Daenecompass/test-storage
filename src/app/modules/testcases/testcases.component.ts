import { Component, OnInit, HostBinding } from '@angular/core';
import Animations from '../../animations';

import { Testcase } from '../../models/testcase';
import { TestcaseService } from '../../services/testcase/testcase.service';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css'],
  providers: [
    TestcaseService
  ],
  animations: [Animations.pageTransition]
})
export class TestcasesComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  testcases: Testcase[] = [];

  constructor(private testcaseService: TestcaseService) { }

  ngOnInit() {
    this.getTestcases();
  }

  getTestcases() {
    this.testcaseService.getTestcases().subscribe(
      testcases => this.testcases = testcases,
      error => console.log(error)
    );
  }

}
