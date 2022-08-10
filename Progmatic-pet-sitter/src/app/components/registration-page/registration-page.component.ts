import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { PetType, PlaceOfService, KeyValue } from '../../interfaces/search-data';
import { UserService } from 'src/app/services/user.service';
import { Userreg, Owner, Sitter } from '../../interfaces/user-reg';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PettypeService } from 'src/app/services/pettype.service';
import { ServicePlaceService } from 'src/app/services/service-place.service';


@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss'],
    animations: [
        trigger('dropdownForm', [
            state('in', style({
                opacity: 1,
                transform: 'scaleY(1)'
            })),
            transition('void => *', [ // fade-in animation
                style({ // initial style, before added to the DOM
                    opacity: 0,
                    transform: 'scaleY(0)'
                }),
                animate(300)
            ]),
            transition('* => void', [ // fade-out animation
                animate(300, style({
                    opacity: 0,
                    transform: 'scaleY(0)'
                }))
            ])
        ])
    ]
})
export class RegistrationPageComponent implements OnInit {

    public user: Userreg;
    public passwordConfirm = '';
    public isRegistrationSuccessful = "DEFAULT";

    // OWNER DATA fields
    public ownerDataOpen = false;
    public ownerData: Owner;
    public currentPetName = '';
    public currentPetType: any;

    // SITTER DATA fields
    public sitterDataOpen = false;
    public sitterData: Sitter;
    public currentPlaceOfService: any;
    public currentServicePetType: any;
    public currentWage: number;
    public errors: any;

    public petTypes: KeyValue[];
    public servicePlaces: KeyValue[];

    constructor(
        public router: Router,
        public userService: UserService,
        public validator: FieldValidatorService,
        public pettypeService: PettypeService,
        public servicePlaceService: ServicePlaceService

    ) {
        this.user = {
            userName: '',
            email: '',
            password: '',
            ownerData: null,
            sitterData: null
        };
        this.ownerData = {
            pets: []
        };
        this.sitterData = {
            address: '',
            postalCode: '',
            city: '',
            intro: '',
            services: []
        };
        this.errors = {
            name: false,
            email: {'empty': false, 'not_valid': false},
            password: {'empty': false, 'not_same': false},
            passwordConfirm: {'empty': false, 'not_same': false},
            petType: false,
            petsname: false,

            address: false,
            postalCode: {'empty': false, 'not_valid': false},
            city: false,
            intro: false,
            servicePlace: false,
            servicePetType: false,
            currentWage: false

        };
        this.petTypes = this.pettypeService.getPetTypeArray();
        this.servicePlaces = this.servicePlaceService.getServicePlaceTypeArray();
        this.servicePlaces.unshift( {key: "NONE", value: "Helyszín típusa"} );
        this.petTypes.unshift( {key: "NONE", value: "Kisállat típusa"} );
        this.currentPetType = "NONE";
        this.currentPlaceOfService = "NONE";
        this.currentServicePetType = "NONE";
    }
    getRegistrationSuccess() {
        return this.isRegistrationSuccessful;
    }

    addToMyPets(): void {
        if (this.currentPetType != "NONE" && this.currentPetName != '') {
            this.currentPetType = PetType[this.currentPetType];
            this.ownerData.pets.push({name: this.currentPetName, petType: this.currentPetType});
            this.errors.petType = false,
            this.errors.petsname = false
            this.currentPetName = '';
            this.currentPetType = "NONE";
        } else if (this.currentPetType == "NONE" && this.currentPetName != ''){
            this.errors.petType = this.validator.validateName(this.user.userName);
            this.errors.petsname = false;
        } else if (this.currentPetType != "NONE" && this.currentPetName == ''){
            this.errors.petsname = this.validator.validateName(this.user.userName);
            this.errors.petType = false;

        } else {
            this.currentPetType == "NONE" && this.currentPetName == ''
            this.errors.petsname = this.validator.validateName(this.user.userName);
            this.errors.petType = this.validator.validateName(this.user.userName);

        }
        console.log(this.ownerData.pets);
    };

    addToMyServices(): void {
        if (this.currentPlaceOfService == "NONE" && this.currentServicePetType != "NONE" && this.currentWage > 0) {
            this.errors.servicePetType = false,
            this.errors.currentWage = false
        }
        if (this.currentPlaceOfService != "NONE" && this.currentServicePetType == "NONE" && this.currentWage > 0) {
            this.errors.servicePlace = false,
            this.errors.currentWage = false
        }
        if (this.currentPlaceOfService != "NONE" && this.currentServicePetType != "NONE" && this.currentWage !> 0) {
            this.errors.servicePlace = false,
            this.errors.servicePetType = false
        }
        if (this.currentPlaceOfService != "NONE" && this.currentServicePetType != "NONE" && this.currentWage > 0 &&
            this.sitterData.city != '' && this.sitterData.address != '' && this.sitterData.postalCode != '' &&
            this.sitterData.intro != '') {
                this.currentPlaceOfService = PlaceOfService[this.currentPlaceOfService];
                this.currentServicePetType = PetType[this.currentServicePetType];
                this.sitterData.services.push({
                    place: this.currentPlaceOfService,
                    petType: this.currentServicePetType,
                    pricePerHour: this.currentWage
                })
                this.errors.servicePlace = false,
                this.errors.servicePetType = false,
                this.errors.currentWage = false
                this.currentPlaceOfService = "NONE";
                this.currentServicePetType = "NONE";

        } else {
            // this.currentPlaceOfService == null && this.currentServicePetType == null && this.currentWage == 0


            this.errors.city = this.validator.validateName(this.sitterData.city);
            this.errors.address = this.validator.validateName(this.sitterData.address);
            this.errors.postalCode.empty = this.validator.validateName(this.sitterData.postalCode);
            this.errors.postalCode.not_valid = !this.validator.validatePostcode(this.sitterData.postalCode);
            this.errors.intro = this.validator.validateName(this.sitterData.intro);
            this.errors.servicePlace = this.validator.validateName(this.user.userName);
            this.errors.servicePetType = this.validator.validateName(this.user.userName);
            this.errors.currentWage = this.validator.validateName(this.sitterData.postalCode);
            }
        // this.currentPlaceOfService = null;
        // this.currentServicePetType = null;
        // this.currentWage = 0;
        console.log(this.sitterData.services);
        }


    submitRegistration() {
        this.isRegistrationSuccessful = "DEFAULT";
        this.errors = {
            name: false,
            email: {'empty': false, 'not_valid': false},
            password: {'empty': false, 'not_same': false},
            passwordConfirm: {'empty': false, 'not_same': false},
            petType: false,
            petsname: false,
            address: false,
            postalCode: {'empty': false, 'not_valid': false},
            city: false,
            intro: false,
            servicePlace: false,
            servicePetType: false,
            currentWage: false
        };
        // név validáládsa
        this.errors.name = this.validator.validateName(this.user.userName);
        // email validáládsa
        this.errors.email.empty = this.validator.validateName(this.user.email);
        this.errors.email.not_valid != this.validator.validateEmail(this.user.email);

        if (this.errors.email.empty) {
            this.errors.email.empty = true;
            this.errors.email.not_valid = true;
        }
        if (!this.errors.email.empty && !this.validator.validateEmail(this.user.email)) {
            this.errors.email.empty = false;
            this.errors.email.not_valid = true;
        }
        if (this.validator.validateEmail(this.user.email)) {
            this.errors.email.empty = false;
            this.errors.email.not_valid = false;
        }
        // jelszó validáládsa
        this.errors.password.empty = this.validator.validateName(this.user.password);
        this.errors.passwordConfirm.empty = this.validator.validateName(this.passwordConfirm);

        if (!this.errors.password.empty && !this.errors.passwordConfirm.empty &&
             this.user.password !== this.passwordConfirm) {
            this.errors.password.not_same = true;
            this.errors.passwordConfirm.not_same = true;
        }

        this.user.ownerData = this.ownerData;
        this.user.sitterData = this.sitterData;

        let u = JSON.parse(JSON.stringify(this.user));
        if (u.ownerData) {
            for (let i = 0; i < u.ownerData.pets.length; i++) {
                u.ownerData.pets[i].petType = this.userService.getEnumKey( PetType, u.ownerData.pets[i].petType );
            }
        }

        if (u.sitterData) {
          for (let i = 0; i < u.sitterData.services.length; i++) {
              u.sitterData.services[i].petType = this.userService.getEnumKey( PetType, u.sitterData.services[i].petType );
              u.sitterData.services[i].place = this.userService.getEnumKey( PlaceOfService, u.sitterData.services[i].place );
              u.sitterData.services[i].pricePerHour = parseInt(u.sitterData.services[i].pricePerHour);
              u.sitterData.services[i].pricePerDay = parseInt(u.sitterData.services[i].pricePerHour) * 8;
          }
        }

        let haveError: boolean = false;
        let element = Object.keys(this.errors).find((e) => {
            if (Object.keys(this.errors[e]).length) {
                Object.values(this.errors[e]).find((elem) => {
                    if (elem === true) {
                        haveError = true;
                        return true;
                    }
                });
                if (haveError) {return true;}
            } else {
                if (this.errors[e] === true) {
                    haveError = true;
                    return true;
                }
            }
        });
        console.log(element);
        console.log(haveError);
        // végül:
        console.log(u);
        if (haveError) {
            //TODO görgessünk fel a hibához
            let el = document.querySelector("#"+ element).querySelector('.scroll-target');
            el.scrollIntoView({behavior:"smooth", block:"start", inline:"start"});
        } else {
            this.userService.registerUser(u)
            .then((result) => {
                this.isRegistrationSuccessful = "SUCCESS";
                console.log(result);
            })
            .catch((error) => {
                // TODO alert
                this.isRegistrationSuccessful = "ERROR";
                console.log(error);
            });
        }

    }


    ngOnInit() {
    }

}
