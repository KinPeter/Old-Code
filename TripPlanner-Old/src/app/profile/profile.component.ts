import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '~/app/services/user-auth/user.service';
import { User } from '~/app/types/user.types';
import { DateFormat } from '~/app/shared/date-format';

@Component({
  selector: 'tp-profile',
  template: `
    <div class="profile-container">
      <header class="d-flex justify-content-between">
        <h2 class="mt-4">{{ user.displayName }}'s profile</h2>
        <button
          mat-fab
          class="mt-2 mr-2"
          color="primary"
          matTooltip="Save Changes"
          [disabled]="disableSaveBtn"
          (click)="saveChanges()"
        >
          <mat-icon>save</mat-icon>
        </button>
      </header>

      <main>
        <section class="profile-info">
          <p>Member since: {{ memberSince | date: preferredDateFormat }}</p>
          <p>Number of trips: {{ numberOfTrips }}</p>
        </section>

        <section class="pic-name-url d-flex">
          <div class="profile-pic">
            <img [src]="getPhotoUrl()" alt="profile picture" />
          </div>
          <div class="name-and-url d-flex flex-column">
            <mat-form-field appearance="outline">
              <mat-label>Display name</mat-label>
              <input
                matInput
                [(ngModel)]="displayName"
                type="text"
                required
                minlength="3"
                maxlength="20"
                #nameInput="ngModel"
                placeholder="Your name"
              />
              <mat-hint>How we can call you?</mat-hint>
              <mat-error *ngIf="nameInput.hasError('required')">
                Field must not be empty.
              </mat-error>
              <mat-error *ngIf="!nameInput.hasError('required')">
                Display name must be between 3 and 20 characters
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="mt-2">
              <mat-label>Photo URL</mat-label>
              <input
                matInput
                [(ngModel)]="photoUrl"
                type="url"
                #photoUrlInput
                placeholder="Link to your profile picture"
                autocomplete="off"
              />
              <mat-hint>Link to your profile picture</mat-hint>
            </mat-form-field>
          </div>
        </section>

        <section class="settings">
          <h3>Settings</h3>
          <mat-form-field>
            <mat-label>Preferred date format</mat-label>
            <mat-select [(ngModel)]="preferredDateFormat">
              <mat-option *ngFor="let format of dateFormatOptions" [value]="format.value">
                {{ format.text }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </section>

        <section class="change-password">
          <h3>Change password</h3>
          <mat-hint>Please choose a strong password!</mat-hint>
          <mat-form-field appearance="outline">
            <mat-label>New password</mat-label>
            <input
              matInput
              [(ngModel)]="newPassword"
              (change)="validatePasswords()"
              type="password"
              minlength="6"
              #passwordInput="ngModel"
              placeholder="Your password"
              autocomplete="off"
            />
            <mat-error *ngIf="passwordInput.hasError('minlength')">
              Password must be at least 6 characters
            </mat-error>
          </mat-form-field>
          <mat-form-field
            appearance="outline"
            [class.ng-invalid]="passwordsDoNotMatch"
            [class.mat-form-field-invalid]="passwordsDoNotMatch"
            [class.ng-valid]="!passwordsDoNotMatch"
          >
            <mat-label>Confirm password</mat-label>
            <input
              matInput
              [(ngModel)]="newPasswordConf"
              (change)="validatePasswords()"
              [class.ng-invalid]="passwordsDoNotMatch"
              [class.ng-valid]="!passwordsDoNotMatch"
              type="password"
              minlength="6"
              #passConfInput="ngModel"
              placeholder="Please type it again"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-error class="do-not-match" *ngIf="passwordsDoNotMatch">
            Passwords do not match!
          </mat-error>
        </section>

        <hr />

        <section class="delete-account mt-4">
          <button
            *ngIf="!confirmingDeletion"
            mat-raised-button
            color="warn"
            (click)="onDeleteAccount()"
          >
            DELETE MY ACCOUNT
          </button>
          <div class="delete-account-confirmation" *ngIf="confirmingDeletion">
            <p>
              <span>Delete account:</span>
              Are you sure? This cannot be undone!
            </p>
            <button class="mr-2" mat-raised-button (click)="onCancelDeleteAccount()">
              CANCEL
            </button>
            <button mat-raised-button color="warn" (click)="onConfirmDeleteAccount()">
              YES, DELETE MY ACCOUNT
            </button>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .profile-container {
        width: 700px;
        padding-left: 1rem;
      }

      .profile-container main {
        padding: 0 2rem;
      }

      .profile-container main section {
        margin-bottom: 2rem;
      }

      .profile-container main .profile-info {
        color: var(--color-text-light);
      }

      .profile-container main .pic-name-url .profile-pic {
        width: 170px;
        height: 170px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 2rem;
      }

      .profile-container main .pic-name-url .profile-pic img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }

      .profile-container main .pic-name-url .name-and-url {
        flex-grow: 1;
      }

      .profile-container main .change-password {
        width: 400px;
      }

      .profile-container main .change-passwordmat-hint {
        font-size: 75%;
        display: block;
        margin-bottom: 1rem;
      }

      .profile-container main .change-password mat-form-field {
        display: block;
      }

      .profile-container main .change-password mat-error.do-not-match {
        font-size: 75%;
        margin-top: -1rem;
        padding-left: 0.5rem;
      }

      .profile-container main .delete-account .delete-account-confirmation span {
        color: var(--color-warn);
      }
    `,
  ],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User;
  private userSub: Subscription;
  public memberSince: Date;
  public numberOfTrips: number;
  public preferredDateFormat: DateFormat = DateFormat.MDY_LONG;
  private originalPreferredDateFormat: string;
  public displayName: string;
  public photoUrl: string;
  public newPassword = '';
  public newPasswordConf = '';
  public passwordsDoNotMatch = false;
  public confirmingDeletion = false;

  public dateFormatOptions = [
    { text: '06 Feb 2020', value: DateFormat.DMY_LONG },
    { text: '06-02-2020', value: DateFormat.DMY_SHORT },
    { text: 'Feb 6, 2020', value: DateFormat.MDY_LONG },
    { text: '02/06/2020', value: DateFormat.MDY_SHORT },
    { text: '2020. Feb. 6.', value: DateFormat.YMD_LONG },
    { text: '2020.02.06.', value: DateFormat.YMD_SHORT },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSub = this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.displayName = user ? user.displayName : '';
      this.photoUrl = user ? user.photoUrl : '';
      this.memberSince = user ? new Date(user.memberSince) : null;
      this.preferredDateFormat = user ? user.preferredDateFormat : null;
      this.originalPreferredDateFormat = user ? user.preferredDateFormat : null;
      this.numberOfTrips = user ? user.numberOfTrips : 0;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  get disableSaveBtn(): boolean {
    return this.isNoChanges() || this.passwordsDoNotMatch || this.displayName.trim().length < 3;
  }

  saveChanges(): void {
    if (
      this.photoUrl !== this.user.photoUrl ||
      this.displayName !== this.user.displayName ||
      this.preferredDateFormat !== this.user.preferredDateFormat
    ) {
      this.userService.updateUser({
        displayName: this.displayName,
        photoUrl: this.photoUrl,
        preferredDateFormat: this.preferredDateFormat,
      });
    }
    if (
      this.newPassword.trim() !== '' &&
      this.newPassword.length >= 6 &&
      !this.passwordsDoNotMatch
    ) {
      this.userService.updateUserPassword(this.newPassword);
      this.newPassword = '';
      this.newPasswordConf = '';
    }
  }

  getPhotoUrl(): string {
    return this.user.photoUrl ? this.user.photoUrl : './assets/default-profile-pic.jpg';
  }

  validatePasswords(): void {
    this.passwordsDoNotMatch = this.newPassword !== this.newPasswordConf;
  }

  isNoChanges(): boolean {
    return (
      this.photoUrl === this.user.photoUrl &&
      this.displayName === this.user.displayName &&
      this.newPassword === '' &&
      this.preferredDateFormat === this.user.preferredDateFormat
    );
  }

  onDeleteAccount(): void {
    this.confirmingDeletion = true;
  }

  onCancelDeleteAccount(): void {
    this.confirmingDeletion = false;
  }

  onConfirmDeleteAccount(): void {
    this.userService.deleteUserAccount();
  }
}
