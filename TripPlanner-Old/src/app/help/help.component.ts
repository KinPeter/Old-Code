import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tp-help',
  template: `
    <p>help works!</p>
  `,
  styles: [
    `
      p {
        font-weight: bold;
      }
    `,
  ],
})
export class HelpComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
