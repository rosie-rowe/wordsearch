import * as React from 'react';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { InputComponent } from '../Input/ReactInputComponent';
import { InputListProps } from './InputListProps';
import { InputListState } from './InputListState';

export class ReactInputListComponent extends React.Component<{}, InputListState> {
    private inputCounter = 0;

    constructor(public props: InputListProps) {
        super(props);
        this.state = { inputs: [{name: this.getNextName(), value: '' }] };
    }

    public getNextName() {
        return `input-${this.inputCounter++}`;
    }

    render() {
        return (
            <div>
                {this.state.inputs.map((input, i) => {
                    return ( <div key={input.name}>
                        <InputComponent formProps={this.props.formProps} name={input.name} validators={this.props.validators} updated={this.updated} />

                        <button className='icon' onClick={(e) => this.removeSlot(e, i)}>✖</button>
                    </div> );
                })}

                <div onClick={() => this.addSlot()}>
                    <ButtonComponent buttonType='button' text={this.props.addSlotButtonText} />
                </div>
            </div>
        );
    }

    public updated(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('hi');
    }

    public addSlot() {
        let inputs = this.state.inputs.slice();
        inputs.push({ name: this.getNextName(), value: '' });

        this.setState({
            inputs
        });

        this.focusNewestInput();
    }

    public removeSlot(event, index: number) {
        let inputs = this.state.inputs.slice();
        inputs.splice(index, 1);

        this.setState({
            inputs
        });
    }

    private focusNewestInput() {
        // TODO
        // setTimeout(() => {
        //     this.inputFocusEventService.inputFocusEvent.emit(this.inputs[this.inputs.length - 1].name);
        // });
    }
}
