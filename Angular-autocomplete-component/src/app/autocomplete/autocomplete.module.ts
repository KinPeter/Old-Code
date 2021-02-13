import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';
import { InputFormComponent } from './input-form/input-form.component';
import { OptionBoxComponent } from './option-box/option-box.component';

@NgModule({
    declarations: [
        AutocompleteComponent,
        InputFormComponent,
        OptionBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AutocompleteComponent
    ]
})
export class AutocompleteModule { }
