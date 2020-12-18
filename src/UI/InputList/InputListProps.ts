import { FormikProps } from 'formik';
import { Input } from '../Input/Input';
import { InputErrors } from '../Input/InputErrors';

export interface InputListProps {
    changed: (inputs: Array<Input<string>>) => void;
    addSlotButtonText: string;
    validators: Array<(value: string) => InputErrors>;
    formProps: FormikProps<any>; // TODO
}