import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '~/app/services/user-auth/auth.service';
import { Quote } from '~/app/types/shared.types';
import { headerQuotes, landingQuotes1, landingQuotes2 } from '~/app/landing-page/travel-quotes';
import { Greeting, greetings } from '~/app/landing-page/greetings';
import { User } from '~/app/types/user.types';
import { UserService } from '~/app/services/user-auth/user.service';

@Component({
  selector: 'tp-landing-page',
  template: `
    <section class="jumbotron">
      <img src="./assets/curvypath.svg" alt="curvypath" id="curvypath" />
      <tp-sliding-quotes [quotes]="headerQuotes" size="big"></tp-sliding-quotes>
      <img src="./assets/tripplanner-logo.svg" alt="tripplanner-logo" id="logo" />
    </section>
    <section class="content-container">
      <div class="landing-content" *ngIf="!auth.isLoggedIn()">
        <h2 class="mt-3">Welcome to TripPlanner!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptates nulla
          similique consequuntur eaque sunt eos a molestiae officiis necessitatibus. Nemo itaque eos
          optio voluptate consequatur totam molestiae, laboriosam laudantium ipsam, omnis ad
          dignissimos nobis aperiam ex. Quas laborum reprehenderit earum soluta in magni molestiae
          exercitationem. Maiores accusantium similique ratione soluta, excepturi libero dolorem
          saepe eveniet? Non quo fugit dolorem incidunt sed reiciendis nostrum esse inventore
          quidem! Aut nostrum iure, quasi tenetur eos similique voluptatibus fugiat! Eum aliquid
          exercitationem id, quam et sapiente ducimus enim eaque quibusdam.
        </p>
        <h3>
          All you have to do, is
          <span>sign up</span>
          now!
        </h3>
        <tp-signup-form></tp-signup-form>
      </div>
      <div class="landing-content" *ngIf="auth.isLoggedIn()">
        <div class="greeting">
          <h2 class="mt-3">{{ greeting.greeting }}, {{ user.displayName }}!</h2>
          <p>(Now you know how to greet people in {{ greeting.language }})</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptates nulla
          similique consequuntur eaque sunt eos a molestiae officiis necessitatibus. Nemo itaque eos
          optio voluptate consequatur totam molestiae, laboriosam laudantium ipsam, omnis ad
          dignissimos nobis aperiam ex. Quas laborum reprehenderit earum soluta in magni molestiae
          exercitationem. Maiores accusantium similique ratione soluta, excepturi libero dolorem
          saepe eveniet? Non quo fugit dolorem incidunt sed reiciendis nostrum esse inventore
          quidem! Aut nostrum iure, quasi tenetur eos similique voluptatibus fugiat! Eum aliquid
          exercitationem id, quam et sapiente ducimus enim eaque quibusdam.
        </p>
      </div>
    </section>
    <section class="quotes-container">
      <tp-sliding-quotes [quotes]="landingQuotes1" size="small"></tp-sliding-quotes>
    </section>
    <section style="height: 400px;" class="content-container">
      <div class="landing-content">
        <h2 class="mt-3">Some content</h2>
      </div>
    </section>
    <section class="quotes-container">
      <tp-sliding-quotes [quotes]="landingQuotes2" size="small"></tp-sliding-quotes>
    </section>
  `,
  styles: [
    `
      .jumbotron,
      .quotes-container {
        width: calc(100% + 1rem);
        background-color: var(--color-teal-darker);
        margin-left: -1rem;
        overflow: hidden;
        position: relative;
      }
      .jumbotron {
        height: 300px;
      }
      .jumbotron img {
        position: absolute;
      }
      .jumbotron img#curvypath {
        right: 0;
        opacity: 0.35;
      }
      .jumbotron img#logo {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 150px;
      }
      @media (min-width: 1025px) {
        .jumbotron img#logo {
          width: 230px;
        }
      }

      .quotes-container {
        height: 180px;
      }
      .content-container {
        width: 100%;
      }
      .content-container .landing-content {
        max-width: 1000px;
        margin: 2rem auto;
      }
      .content-container .landing-content .greeting p {
        font-size: 85%;
        font-style: italic;
      }
      .content-container .landing-content h3 {
        color: var(--color-teal);
        font-style: italic;
      }
      .content-container .landing-content h3 span {
        color: var(--color-deep-orange);
      }
    `,
  ],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  public headerQuotes: Quote[];
  public landingQuotes1: Quote[];
  public landingQuotes2: Quote[];
  private greetings: Greeting[];
  public greeting: Greeting;
  public user: User;
  private userSub: Subscription;

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.headerQuotes = headerQuotes;
    this.landingQuotes1 = landingQuotes1;
    this.landingQuotes2 = landingQuotes2;
    this.greetings = greetings;
    const rnd = Math.floor(Math.random() * this.greetings.length);
    this.greeting = this.greetings[rnd];
    this.userSub = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
