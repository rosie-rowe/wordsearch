import { NgModule } from '@angular/core';
import { WordSearchGeneratorFormComponent } from './WordSearchGeneratorFormComponent';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../Button/ButtonModule';
import { CheckboxModule } from '../Checkbox/CheckboxModule';
import { DropdownModule } from '../Dropdown/DropdownModule';
import { IconButtonModule } from '../IconButton/IconButtonModule';
import { InputModule } from '../Input/InputModule';
import { InputListModule } from '../InputList/InputListModule';

@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
        CheckboxModule,
        DropdownModule,
        IconButtonModule,
        InputModule,
        InputListModule,
        ReactiveFormsModule
    ],
    declarations: [
        WordSearchGeneratorFormComponent,
    ],
    entryComponents: [
        WordSearchGeneratorFormComponent
    ],
    exports: [
        WordSearchGeneratorFormComponent
    ]
})
export class WordSearchGeneratorFormModule {
}
