import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { EasyWordSearchGenerationStrategy } from './EasyWordSearchGenerationStrategy';
import { Injectable } from '@angular/core';
import { MediumWordSearchGenerationStrategy } from './MediumWordSearchGenerationStrategy';
import { HardWordSearchGenerationStrategy } from './HardWordSearchGenerationStrategy';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export class WordSearchGenerationStrategyFactory {
    constructor(
        private easyWordSearchGenerationStrategy: EasyWordSearchGenerationStrategy,
        private mediumWordSearchGenerationStrategy: MediumWordSearchGenerationStrategy,
        private hardWordSearchGenerationStrategy: HardWordSearchGenerationStrategy
    ) {
    }

    public createStrategy(difficulty: WordSearchDifficulty) {
        switch (difficulty) {
            case WordSearchDifficulty.Easy:
                return this.easyWordSearchGenerationStrategy;

            case WordSearchDifficulty.Medium:
                return this.mediumWordSearchGenerationStrategy;

            case WordSearchDifficulty.Hard:
                return this.hardWordSearchGenerationStrategy;

            default:
                throw new Error("Not implemented!");
        }
    }
}