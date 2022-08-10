import { Injectable } from '@angular/core';
//import {SearchData} from '../interfaces/search-data'

@Injectable({
    providedIn: 'root'
})
export class FieldValidatorService {

    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line


    constructor() { }

    validateEmail(emailAddress: string): boolean {
        return this.emailRegex.test(emailAddress);
    }

    validatePostcode(postcode: string): boolean {
      if ('' + postcode === '' || postcode == null) return true;
      return ! isNaN(parseInt('' + postcode, 10)) && /^[1-9][0-9]{3}$/.test('' + postcode);
    }
    validatePostcodeInComponent(isPostcodeValid: boolean, postcode: string) : boolean {
      if (postcode == null ) {
        return false;
      } else {
        isPostcodeValid = this.validatePostcode( postcode );
        return !isPostcodeValid;
      }
    }

    validateEmailInComponent(isEmailValid: boolean, email: string) : boolean {
      if (email == null ) {
        return false;
      } else {
        isEmailValid = this.validateEmail( email );
        return !isEmailValid;
      }
    }

    validateName(name: string): boolean {
        return name.trim() == '';
    }

}
