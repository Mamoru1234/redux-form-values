import {FormFieldState} from './Interfaces';
import {
  CHANGE_FIELD,
  CHANGE_FIELD_ERROR,
  CHANGE_FIELD_TOUCHED,
  FieldAction,
  INIT_FIELD,
  InitPayload
} from './FormFieldActions';
import get from 'lodash/get';

export interface FormFieldsState {
  [fieldId: string]: FormFieldState<any>;
}

export default function (state: FormFieldsState = {}, action: FieldAction<any> = {} as any) {
  if (action.type === INIT_FIELD) {
    const payload: InitPayload<any>  = action.payload;
    if (state[action.fieldId] && !get(payload.options, 'resetIfExists', false)) {
      return state;
    }
    return {
      ...state,
      [action.fieldId]: payload.value,
    };
  }
  if (action.type === CHANGE_FIELD) {
    if (!state[action.fieldId]) {
      return state;
    }
    return {
      ...state,
      [action.fieldId]: {
        ...state[action.fieldId],
        value: action.payload,
      },
    };
  }
  if (action.type === CHANGE_FIELD_TOUCHED) {
    if (!state[action.fieldId]) {
      return state;
    }
    return {
      ...state,
      [action.fieldId]: {
        ...state[action.fieldId],
        touched: action.payload,
      },
    };
  }
  if (action.type === CHANGE_FIELD_ERROR) {
    if (!state[action.fieldId]) {
      return state;
    }
    return {
      ...state,
      [action.fieldId]: {
        ...state[action.fieldId],
        errorMessage: action.payload,
      },
    };
  }
  return state;
}
