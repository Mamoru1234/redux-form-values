import {FormFieldState} from './Interfaces';

export interface FieldAction<T> {
  type: symbol;
  fieldId: string;
  payload: T
}

export const INIT_FIELD = Symbol('INIT_FIELD');

export const initField = <T>(fieldId: string, value: FormFieldState<T>): FieldAction<FormFieldState<T>> => ({
  fieldId,
  payload: value,
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
