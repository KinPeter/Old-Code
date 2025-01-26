import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'tp-editor',
  template: `
    <p>Editor works: {{ tripId }}</p>
  `,
  styles: [``]
})
export class EditorComponent implements OnInit {
  public tripId: string

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tripId = params.tripId
    })
  }

  ngOnInit(): void {}
}
