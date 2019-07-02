import {FieldDescriptor, FieldDescriptorOptions, FieldInitOptions, FormFieldState} from './Interfaces';
import {changeField, changeFieldError, changeFieldTouched, destroyField, initField} from './FormFieldActions';
import isUndefined from 'lodash/isUndefined';

const undefDefault = <T>(value: T | undefined, defaultValue: T): T => {
  if (isUndefined(value)) {
    return defaultValue;
  }
  return value;
};

export const generateDescriptor = <T>(fieldId: string, options: FieldDescriptorOptions<T>): FieldDescriptor<T> => {
  const validator = undefDefault(options.validator, () => undefined);
  return {
    fieldStateSelector: (state: any) => state.fields[fieldId],
    changeFieldTouched(newValue: boolean): any {
      return changeFieldTouched(fieldId, newValue);
    },
    changeField(value: T): any {
      return (dispatch: any, getState: () => any) => {
        const state = getState();
        const fieldState: FormFieldState<T> = state.fields[fieldId];
        if (!fieldState) {
          throw new Error('Change field before init');
        }
        dispatch(changeField(fieldId, value));
        const errorMessage = validator(value, state);
        if (fieldState.errorMessage !== errorMessage) {
          dispatch(changeFieldError(fieldId, errorMessage));
        }
      };
    },
    initField(state: Partial<FormFieldState<T>>, initOptions?: FieldInitOptions): any {
      return (dispatch: any, getState: () => any) => {
        const value = undefDefault(state.value, options.defaultValue);
        const finalState: FormFieldState<T> = {
          initialValue: undefDefault(state.initialValue, value),
          value: value,
          touched: undefDefault(state.touched, false),
          errorMessage: undefDefault(state.errorMessage, validator(value, getState())),
        };
        return dispatch(initField(fieldId, finalState, initOptions));
      };
    },
    setError(errorMessage?: string): any {
      return changeFieldError(fieldId, errorMessage);
    },
    destroy(): any {
      return destroyField(fieldId);
    },
  };
};
