import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { Injectable } from '@angular/core';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

/** the simplest one, just get an array for each row as-is */
@Injectable({
    providedIn: WordSearchStateSlicerModule
})
export class HorizontalWordSearchStateSlicer implements WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): LetterWithPosition[][] {
        let slice = [];

        for (let i = 0; i < currentState.rows; i++) {
            slice.push(lettersWithPositions.filter(lwp => lwp.row === i));
        }

        return slice;
    }
}
