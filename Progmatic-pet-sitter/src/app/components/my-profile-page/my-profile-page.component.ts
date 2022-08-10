import { Component, OnInit, Input } from '@angular/core';
import {User, Sitter, Owner, Day} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { PettypeService } from '../../services/pettype.service';
import { ServicePlaceService } from '../../services/service-place.service';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../interfaces/search-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {herokuURL} from 'src/app/app-settings';
import { SitterView } from 'src/app/interfaces/sitterView';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss'],
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
export class MyProfilePageComponent implements OnInit {

    selectedFile: File = null;

    sitterView: SitterView;



    user: User;
    sitter: Sitter;
    owner: Owner;

    // OWNER DATA fields
    currentPetName = '';
    currentPetType : any;

    // SITTER DATA fields
    currentPlaceOfService : any;
    currentServicePetType : any;
    currentWage = 0;

    errors: any;



    petTypes: KeyValue[];
    servicePlaces: KeyValue[];


    addPetOpen = false;
    addServiceOpen = false;

    passwordConfirm = '';

    profilePicUrl: string;

    isSaveSuccessful = false;
    showNetworkAlert = false;
    isLoading = false;

    isEmailValid: true;
    isPasswordValid: true;
    isPostcodeValid: true;


    constructor(public pettypeService: PettypeService, public servicePlaceService: ServicePlaceService,
      public userService: UserService, public validator: FieldValidatorService, public auth: AuthenticationService,
      public http: HttpClient) {
      this.errors = [];
      this.showNetworkAlert = false;
    //  this.isPasswordValid = true;
      this.petTypes = [];
      for(let type in PetType) {
        this.petTypes.push({"key": type, "value": PetType[type]});
      }

      this.servicePlaces= [];
      for(let place in PlaceOfService) {
        this.servicePlaces.push({"key": place, "value": PlaceOfService[place]});
      }


      this.petTypes = this.pettypeService.getPetTypeArray();
      this.servicePlaces = this.servicePlaceService.getServicePlaceTypeArray();
      this.servicePlaces.unshift( {key: "NONE", value: "Helyszín típusa"} );
      this.petTypes.unshift( {key: "NONE", value: "Kisállat típusa"} );
      this.currentPetType = "NONE";
      this.currentPlaceOfService = "NONE";
      this.currentServicePetType = "NONE";


      this.user = this.auth.currentUser;
      if (this.user.ownerData) {
        for (let i = 0; i < this.user.ownerData.pets.length; i++) {
            this.user.ownerData.pets[i].petType = PetType[this.user.ownerData.pets[i].petType];
        }
      }

      if (this.user.sitterData) {
        for (let i = 0; i < this.user.sitterData.services.length; i++) {
            this.user.sitterData.services[i].place = PlaceOfService[this.user.sitterData.services[i].place];
            this.user.sitterData.services[i].petType = PetType[this.user.sitterData.services[i].petType];
        }
      }
      console.log(this.user);
      this.setProfilePicUrl();


    }

    ngOnInit() {
    }

    onFileSelected(event){
      this.selectedFile = <File>event.target.files[0];
    }

    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post(`https://petsitter-backend.herokuapp.com/user/${this.user.userId}/image`, fd, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true
      })
      .subscribe(event =>{
        if (event.type === HttpEventType.UploadProgress){
          console.log('Uplouad progress: ' + Math.round(event.loaded / event.total) * 100 + '%');
        } else if(event.type === HttpEventType.Response){
          // console.log(event);

        }
      })
    }


    setProfilePicUrl(): void {
        this.userService.checkPictureEndpoint(this.user.userId)
        .then((response) => {
            if (response) { this.profilePicUrl = herokuURL + '/user/' + this.user.userId+ '/image'; }
        })
        .catch((error) => {
            this.profilePicUrl = '/assets/images/defaultAvatar.png';
        })
    }


    validatePassword(isPasswordSame: boolean): boolean{
      if (this.user.password != null && this.passwordConfirm !== this.user.password) {
          return !isPasswordSame
      }
    }



    save(): void {
      this.showNetworkAlert = false;
      this.isSaveSuccessful = true;
      this.isLoading = true;
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
            u.sitterData.availabilities = this.userService.removeBlankDays(u.sitterData.availabilities);
        }
      }

      this.userService.modifyUser(u).then(() =>{
        this.isSaveSuccessful = true;
        setTimeout( ()=>{ this.isSaveSuccessful = false}, 3000)
      }).catch(() => {
        showNetworkAlert: true;
      })

      .finally(() => {
          this.isLoading = false;
      });
    }




    addToMyPets(): void {
        this.currentPetType = PetType[this.currentPetType];
        if (!this.user.ownerData) {
          this.user.ownerData = {
            pets: []
          }
        }
        this.user.ownerData.pets.push({name: this.currentPetName, petType: this.currentPetType});
        this.currentPetName = '';
        this.currentPetType = "NONE";
        console.log(this.user.ownerData.pets);
    }

    deletePet(pet)  {
      this.user.ownerData.pets.splice(this.user.ownerData.pets.indexOf(pet), 1);
    }

    addToMyServices(): void {
      this.currentServicePetType = PetType[this.currentServicePetType];
      this.currentPlaceOfService = PlaceOfService[this.currentPlaceOfService];
        this.user.sitterData.services.push({
            place: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage
        });
        this.currentPlaceOfService = "NONE";
        this.currentServicePetType = "NONE";
        this.currentWage = 0;
        console.log(this.user.sitterData.services);
    }

    deleteService(service)  {
      this.user.sitterData.services.splice(this.user.sitterData.services.indexOf(service), 1);
    }

    showSitterData(): boolean{
      if (this.user.sitterData != null) {
        return true;
      }
    }

    showOwnerData(): boolean{
      if (this.user.ownerData != null) {
        return true;
      }
    }

    updateAvailabilities(days: Day[]): void {
      this.user.sitterData.availabilities = days;
      //console.log(days);
    }


}
