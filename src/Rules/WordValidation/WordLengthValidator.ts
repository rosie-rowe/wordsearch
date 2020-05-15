import { WordValidator } from './WordValidator';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class WordLengthValidator implements WordValidator {
    getMessage(word: string) {
        return `${word} is longer than both the height and width!`;
    }

    validate(currentState: WordSearchState, word: string) {
        let tooWide = () => word.length > currentState.columns;
        let tooTall = () => word.length > currentState.rows;

        if (tooWide() || tooTall()) {
            return false;
        }

        return true;
    }
}