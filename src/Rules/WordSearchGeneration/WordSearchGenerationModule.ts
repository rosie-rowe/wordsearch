import { NgModule } from '@angular/core';
import { LetterPlaceholderModule } from 'src/Rules/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';
import { WordValidationModule } from '../WordValidation/WordValidationModule';
import { WordPositionModule } from '../WordPosition/WordPositionModule';
import { PlayableWordSearchModule } from 'src/UI/PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        LetterPlaceholderModule,
        PlayableWordSearchModule,
        WordPositionModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
