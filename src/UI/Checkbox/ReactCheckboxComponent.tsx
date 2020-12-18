import * as React from 'react';
import { CheckboxProps } from './CheckboxProps';
import { CheckboxState } from './CheckboxState';

export class CheckboxComponent extends React.Component<{}, CheckboxState> {
    constructor(public props: CheckboxProps) {
        super(props);
        this.state = { checked: this.props.value };
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.handleChange(e)}
                       type='checkbox'
                       name={this.props.name}
                       id={this.props.name}
                       checked={this.state.checked} />
                <label htmlFor={this.props.name}>{this.props.label}</label>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ checked: e.target.checked }, () => this.props.updated(this.state.checked));
    }
}