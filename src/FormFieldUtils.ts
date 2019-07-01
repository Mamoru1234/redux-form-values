import {FieldDescriptor, FormFieldState} from './Interfaces';
import {changeField, changeFieldTouched, initField} from './FormFieldActions';

export const generateDescriptor = <T>(fieldId: string): FieldDescriptor<T> => {
  return {
    fieldStateSelector: (state: any) => state.fields[fieldId],
    changeFieldTouched(newValue: boolean): any {
      return changeFieldTouched(fieldId, newValue);
    },
    changeField(value: T): any {
      return changeField(fieldId, value);
    },
    initField(state: FormFieldState<T>): any {
      return initField(fieldId, state);
    },
    setError(errorMessage: string): void {
    }
  };
};
