import { Component, Input } from '@angular/core';

@Component({
  selector: 'pk-contacts',
  template: `
    <div class="contacts">
      <a class="contact-button button-vertical-animated" [href]="ctc.email" target="_blank">
        <pk-icon-email
          class="contact-button__icon"
          [class.contact-button__icon_hovered]="hovered"
        ></pk-icon-email>
      </a>
      <a class="contact-button button-vertical-animated" [href]="ctc.linkedIn" target="_blank">
        <pk-icon-linkedin
          class="contact-button__icon"
          [class.contact-button__icon_hovered]="hovered"
        ></pk-icon-linkedin>
      </a>
      <a class="contact-button button-vertical-animated" [href]="ctc.facebook" target="_blank">
        <pk-icon-facebook
          class="contact-button__icon"
          [class.contact-button__icon_hovered]="hovered"
        ></pk-icon-facebook>
      </a>
    </div>
  `,
  styles: [
    `
      .contacts {
        display: flex;
      }

      .contact-button {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .contact-button__icon {
        height: 24px;
        text-decoration: none;
        color: var(--text-color-light);
        transition: all 0.3s ease;
      }

      .contact-button__icon_hovered {
        color: var(--text-color);
      }
    `,
  ],
})
export class ContactsComponent {
  @Input() hovered = false;

  constructor() {}

  public ctc = {
    email: 'mailto:jessietwo94@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/cheyoon-jung-11148b19b/',
    facebook: 'https://www.facebook.com/profile.php?id=100009356724474',
  };
}
