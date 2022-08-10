import { Component } from '@angular/core';

@Component({
  selector: 'pk-footer',
  template: `
    <footer (mouseover)="hovered = true" (mouseleave)="hovered = false">
      <div class="footer-left">
        <small>
          Website by
          <a href="https://www.p-kin.com" target="_blank">P-Kin.com</a>
          , © {{ currentYear }}, Jung Cheyoon
        </small>
      </div>
      <div class="footer-right">
        <pk-contacts [hovered]="hovered"></pk-contacts>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        position: fixed;
        bottom: 0;
        left: 0;
        display: none;
        width: 100vw;
        height: 52px;
        justify-content: space-between;
        align-items: center;
        padding: 0 90px;
        background: var(--background-color);
        color: var(--text-color-light);
        transition: all 0.3s ease;
      }

      footer a {
        text-decoration: none;
        color: var(--color-accent-light);
      }

      @media (min-width: 912px) {
        footer {
          display: flex;
        }
      }

      footer:hover {
        background: var(--background-color-secondary);
        color: var(--text-color);
      }

      footer:hover pk-contacts {
        color: var(--text-color) !important;
      }
    `,
  ],
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
  public hovered = false;

  constructor() {}
}
