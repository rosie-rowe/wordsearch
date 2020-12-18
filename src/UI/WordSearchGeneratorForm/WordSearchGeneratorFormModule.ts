import { NgModule } from '@angular/core';
import { WordSearchGeneratorFormComponent } from './WordSearchGeneratorFormComponent';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../Checkbox/CheckboxModule';
import { DropdownModule } from '../Dropdown/DropdownModule';
import { WordSearchOutputModule } from 'src/UI/WordSearchOutput/WordSearchOutputModule';
import { CardModule } from '../Card/CardModule';
import { PlayableWordSearchModule } from '../PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        CardModule,
        CommonModule,
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchOutputModule
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
