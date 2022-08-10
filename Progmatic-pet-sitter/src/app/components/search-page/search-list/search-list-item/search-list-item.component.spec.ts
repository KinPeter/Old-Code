import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListItemComponent } from './search-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchListComponent } from '../search-list.component';
import { SearchDataComponent } from '../../search-data/search-data.component';
import { FormsModule } from '@angular/forms';
import { MainSearchComponent } from 'src/app/components/front-page/main-search/main-search.component';
import { SearchPageComponent } from '../../search-page.component';
import { PlaceOfService, PetType } from 'src/app/interfaces/search-data';

describe('SearchListItemComponent', () => {
    let component: SearchListItemComponent;
    let fixture: ComponentFixture<SearchListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchListItemComponent, SearchListComponent, SearchDataComponent, MainSearchComponent, SearchPageComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchListItemComponent);
        component = fixture.componentInstance;
        component.sitter = {
            id: 1,
            name: 'Pxd',
            profilePhoto: null,
            city: 'Budapest',
            address: 'xxxyyy',
            postalCode: '1234',
            intro: 'asdasdasd',
            services: {
                place: PlaceOfService.OWNERS_HOME,
                petType: PetType.BIRD,
                pricePerDay: 3000,
                pricePerHour: 3000
            },
            availabilities: {
                id: 0,
                availability: 'asd',
                date: new Date()
            }
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
