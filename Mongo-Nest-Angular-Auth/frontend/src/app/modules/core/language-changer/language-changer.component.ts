import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { environment } from '~/environments/environment'

@Component({
  selector: 'tp-language-changer',
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="languageMenu"
      [matTooltip]="'common.language' | translate"
    >
      <mat-icon>translate</mat-icon>
    </button>
    <mat-menu #languageMenu="matMenu">
      <button *ngFor="let lang of languages" mat-menu-item (click)="onSelect(lang)">
        {{ 'common.languages.' + lang | translate }}
        <mat-icon *ngIf="currentLanguage === lang" color="primary">check</mat-icon>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      button[mat-menu-item] {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button[mat-menu-item] mat-icon {
        margin-right: 0;
        margin-left: 1rem;
      }
    `
  ]
})
export class LanguageChangerComponent implements OnInit {
  public languages: string[] = environment.languages
  public currentLanguage: string

  constructor(private translate: TranslateService) {
    translate.onLangChange.subscribe(
      (event: { lang: string; translations: Record<string, unknown> }) => {
        this.currentLanguage = event.lang
      }
    )
  }

  ngOnInit(): void {}

  public onSelect(lang: string): void {
    this.translate.use(lang)
  }
}
