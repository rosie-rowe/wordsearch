import { TestBed, async } from '@angular/core/testing';
import { WordPositionModule } from './WordPositionModule';
import { TopDownDiagonalWordPositionService } from './TopDownDiagonalWordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordPosition } from './WordPosition';

describe('TopDownDiagonalWordPositionService', () => {
    let service: TopDownDiagonalWordPositionService;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordPositionModule
            ]
        });

        service = TestBed.inject(TopDownDiagonalWordPositionService);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should return valid data for a blank matrix', () => {
        let n = LetterPlaceholder.value;

        let matrix = [
            [n, n, n],
            [n, n, n],
            [n, n, n]
        ];

        let state = createState(matrix);

        let word = 'pig';

        let result = service.getValidStartPositions(state, word);

        let expected: WordPosition[] = [
            { column: 0, row: 0 }
        ];

        TestUtils.testArrayEquivalency(result, expected);
    });

    it('should return valid data for a matrix with overlaps', () => {
        let n = LetterPlaceholder.value;

        let matrix = [
            [n,  n,  n],
            [n, 'i', n],
            [n,  n,  n]
        ];

        let state = createState(matrix);

        let word = 'pig';

        let result = service.getValidStartPositions(state, word);

        let expected: WordPosition[] = [
            { column: 0, row: 0, hasOverlaps: true }
        ];

        TestUtils.testArrayEquivalency(result, expected);
    });
});
