import {FieldInitOptions, FormFieldState} from './Interfaces';

export interface FieldAction<T> {
  type: symbol;
  fieldId: string;
  payload: T
}

export const INIT_FIELD = Symbol('INIT_FIELD');

export interface InitPayload<T> {
  value: FormFieldState<T>;
  options?: FieldInitOptions;
}

export const initField = <T>(fieldId: string, value: FormFieldState<T>,
                             options?: FieldInitOptions): FieldAction<InitPayload<T>> => ({
  fieldId,
  payload: {
    value,
    options,
  },
  type: INIT_FIELD,
});

export const CHANGE_FIELD = Symbol('CHANGE_FIELD');

export const changeField = <T>(fieldId: string, value: T): FieldAction<T> => ({
  fieldId,
  payload: value,
  type: CHANGE_FIELD,
});

export const CHANGE_FIELD_TOUCHED = Symbol('CHANGE_FIELD_TOUCHED');

export const changeFieldTouched = (fieldId: string, touched: boolean): FieldAction<boolean> => ({
  fieldId,
  payload: touched,
  type: CHANGE_FIELD_TOUCHED,
});

export const CHANGE_FIELD_ERROR = Symbol('CHANGE_FIELD_ERROR');

export const changeFieldError = (fieldId: string, errorMessage?: string): FieldAction<string | undefined> => ({
  fieldId,
  payload: errorMessage,
  type: CHANGE_FIELD_ERROR,
});

export const DESTROY_FIELD = Symbol('DESTROY_FIELD');
export const destroyField = (fieldId: string): FieldAction<null> => ({
  fieldId,
  type: DESTROY_FIELD,
  payload: null,
});
