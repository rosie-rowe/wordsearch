import { WordSearchOutputStrategy } from 'src/Rules/WordSearchOutput/WordSearchOutputStrategy';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';

/**
 * This one doesn't need to implement the abtract base class --
 * it's just going to fire an event to activate the playable game component
 */
export class PlayableWordSearchOutputStrategy implements WordSearchOutputStrategy {
    public static getValue() {
        return 'playable';
    }

    public static getViewValue() {
        return 'Playable';
    }

    clean() {
        // TODO redux action
    }

    output(currentState: WordSearchState) {
        // TODO redux action
    }
}
