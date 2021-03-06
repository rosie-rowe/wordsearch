import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ConsoleWordSearchOutputStrategy } from 'src/UI/WordSearchOutput/ConsoleWordSearchOutputStrategy';
import { DropdownOption } from '../Dropdown/DropdownOption';
import { WordSearchOutputStrategyFactory } from 'src/UI/WordSearchOutput/WordSearchOutputStrategyFactory';
import { ImageWordSearchOutputStrategy } from 'src/UI/WordSearchOutput/ImageWordSearchOutputStrategy';
import { environment } from 'src/environments/environment';
import { WordSearchOutputStrategy } from 'src/Rules/WordSearchOutput/WordSearchOutputStrategy';
import { PlayableEventService } from '../PlayableEvent/PlayableEventService';
import { PlayableWordSearchOutputStrategy } from '../WordSearchOutput/PlayableWordSearchOutputStrategy';

@Component({
  selector: 'wordsearch-generator-form',
  styleUrls: ['./WordSearchGeneratorFormComponent.less'],
  templateUrl: './WordSearchGeneratorFormComponent.html'
})
export class WordSearchGeneratorFormComponent implements OnInit {
  constructor(
    private playableEventService: PlayableEventService,
    private wordSearchGenerationService: WordSearchGenerationService,
    private wordSearchStateFactory: WordSearchStateFactory,
    private wordSearchOutputStrategyFactory: WordSearchOutputStrategyFactory,
    private wordValidationService: WordValidationService
  ) {
  }

  public gameFormGroup: FormGroup;
  public directionFormGroup: FormGroup;
  public wordFormGroup: FormGroup;

  /**
   * We need a WordSearchState in order to validate the words as they are typed.
   * This one will not actually be used to compute the final result.
   * Changes to generationOptions should be immediately reflected in dummyState.
   */
  public dummyState: WordSearchState;

  /** if this is populated, we should display a component that allows it to be played */
  public playableState: WordSearchState;

  public generationOptions: WordSearchGenerationOptions = {
    height: 5,
    width: 5,
    alphabetizeWordList: false,
    showWordList: true,
    title: '',
    words: [],
    filterAccidentalProfanity: false,
    allowHorizontal: true,
    allowVertical: true,
    allowDiagonal: false,
    allowBackwards: false,
    allowOverlaps: false,
    zealousOverlaps: false
  };

  public outputOptions: DropdownOption<string>[] = [
    { value: PlayableWordSearchOutputStrategy.getValue(), viewValue: PlayableWordSearchOutputStrategy.getViewValue() },
    { value: ImageWordSearchOutputStrategy.getValue(), viewValue: ImageWordSearchOutputStrategy.getViewValue() }
  ];

  public selectedOutputOption: string;

  public wordValidators: ValidatorFn[];

  private outputStrategy: WordSearchOutputStrategy;

  public ngOnInit() {
    if (!environment.production) {
      this.outputOptions.push({
        value: ConsoleWordSearchOutputStrategy.getValue(),
        viewValue: ConsoleWordSearchOutputStrategy.getViewValue()
      });
    }

    this.selectedOutputOption = this.outputOptions[0].value;

    this.dummyState = this.wordSearchStateFactory.createWordSearch(this.generationOptions);

    this.wordValidators = [
      (control: AbstractControl) => {
        return this.wordValidationService.getErrors(this.dummyState, control.value);
      }
    ];

    this.gameFormGroup = new FormGroup({});

    this.directionFormGroup = new FormGroup({}, (group: FormGroup) => {
      let isValid = Object.keys(group.controls).some(key => group.controls[key].value);

      return isValid ? null : { required: 'At least one direction must be selected!' };
    });

    this.wordFormGroup = new FormGroup({});

    this.gameFormGroup.addControl('direction', this.directionFormGroup);
    this.gameFormGroup.addControl('word', this.wordFormGroup);
    this.gameFormGroup.setValidators((group) => {
      return this.getWordsFromForm().length > 0 ? null : { required: 'At least one word must be present!' };
    });

    this.playableEventService.activate.subscribe((state: WordSearchState) => {
      this.playableState = this.wordSearchStateFactory.createWordSearchCopy(state);
    });

    this.playableEventService.deactivate.subscribe(() => this.playableState = null);
  }

  public generate() {
    this.generationOptions.words = this.getWordsFromForm();

    let result = this.wordSearchGenerationService.generateWordSearch(this.generationOptions);

    if (this.outputStrategy) {
      this.outputStrategy.clean();
    }

    this.outputStrategy = this.wordSearchOutputStrategyFactory.createOutputStrategy(this.selectedOutputOption);
    this.outputStrategy.output(result);
  }

  private getWordsFromForm() {
    let formValues = Object.keys(this.wordFormGroup.controls).map(key => this.wordFormGroup.controls[key].value);

    // don't include blanks
    let result = formValues.filter(val => !!val);

    return result;
  }

  public setColumns(columns: string) {
    this.generationOptions.width = parseInt(columns, 10);
    this.updateWordListValidity();
  }

  public setRows(rows: string) {
    this.generationOptions.height = parseInt(rows, 10);
    this.updateWordListValidity();
  }

  public setTitle(title: string) {
    this.generationOptions.title = title;
  }

  public setShowWordList(showWordList: boolean) {
    this.generationOptions.showWordList = showWordList;
  }

  public setAlphabetizeWordList(alphabetizeWordList: boolean) {
    this.generationOptions.alphabetizeWordList = alphabetizeWordList;
  }

  public setFilterProfanity(filterProfanity: boolean) {
    this.generationOptions.filterAccidentalProfanity = filterProfanity;
  }

  public setAllowHorizontal(allow: boolean) {
    this.generationOptions.allowHorizontal = allow;
  }

  public setAllowVertical(allow: boolean) {
    this.generationOptions.allowVertical = allow;
  }

  public setAllowDiagonal(allow: boolean) {
    this.generationOptions.allowDiagonal = allow;
  }

  public setAllowBackwards(allow: boolean) {
    this.generationOptions.allowBackwards = allow;
  }

  public setAllowOverlaps(allow: boolean ) {
    this.generationOptions.allowOverlaps = allow;
  }

  public setOutputOption(outputOption: string) {
    this.selectedOutputOption = outputOption;
  }

  public setZealousOverlaps(zealous: boolean) {
    this.generationOptions.zealousOverlaps = zealous;
  }

  /** The functions that call this will fire after a UI change that may change whether currently-entered words are still valid */
  private updateWordListValidity() {
    Object.keys(this.wordFormGroup.controls).forEach(key => {
      this.wordFormGroup.controls[key].updateValueAndValidity();
    });
  }
}
