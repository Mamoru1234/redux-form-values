import {FieldDescriptor, FieldValidator} from './Interfaces';
import {generateDescriptor} from './FormFieldUtils';
import forEach from 'lodash/forEach';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

export type FormDescriptors<T> = {[key in keyof T]: FieldDescriptor<T[key]>};

export type FormValidation<FormValues> = {
  [key in keyof FormValues]: FieldValidator<FormValues[key]>;
};

// export const defaultValidator: FieldValidator<any> = () => undefined;

export interface FormOptions<FormValues> {
  defaultValues: FormValues;
  validation?: Partial<FormValidation<FormValues>>;
}

export class Form<FormValues, K extends keyof FormValues> {
  public readonly descriptors: FormDescriptors<FormValues>;
  private initCalled: boolean = false;
  private readonly isFormValidSelector: (state: any) => boolean;
  private readonly formValuesSelector: (state: any) => FormValues;
  constructor(
    private readonly _formId: string,
    private readonly _fields: K[],
    private readonly _options: FormOptions<FormValues>,
  ) {
    this.descriptors = _fields.reduce((acc: FormDescriptors<FormValues>, field: K) => {
      acc[field] = generateDescriptor<FormValues[K]>(`${_formId}_${field}`, {
        defaultValue: _options.defaultValues[field],
        validator: _options.validation && _options.validation[field],
      });
      return acc;
    }, {} as FormDescriptors<FormValues>);
    this.isFormValidSelector = (state: any) => values<FormDescriptors<FormValues>>(this.descriptors)
      .every((descriptor: FieldDescriptor<any>) => descriptor.fieldStateSelector(state).errorMessage === undefined);
    this.formValuesSelector = (state: any) =>
      mapValues(this.descriptors, (descriptor) => descriptor.fieldStateSelector(state).value) as any;
  }
  // TODO options for init
  public initValues(initValues?: Partial<FormValues>): any {
    return (dispatch: any) => {
      forEach(this.descriptors, (descriptor, key) => {
        dispatch(descriptor.initField({
          value: initValues && initValues[key as K]
        }));
      });
      this.initCalled = true;
    };
  }
  public getValues(state: any): FormValues {
    if (!this.initCalled) {
      throw new Error('Get values before init restricted');
    }
    return this.formValuesSelector(state);
  }
  public isValid(state: any): boolean {
    return this.isFormValidSelector(state);
  }
  public validate(): any {
    return (dispatch: any, getState: () => any) => {
      if (!this.initCalled) {
        throw new Error('Validation before init');
      }
      const { validation } = this._options;
      if (!validation) {
        return true;
      }
      const state = getState();
      const formValues = this.formValuesSelector(state);
      let hasSomeError = false;
      forEach(validation, (validator, key) => {
        if (!validator) {
          return;
        }
        const error = validator(formValues[key as keyof FormValues], state);
        const descriptor = this.descriptors[key as keyof FormValues];
        const curError = descriptor.fieldStateSelector(state).errorMessage;
        if (error !== curError) {
          hasSomeError = true;
          dispatch(descriptor.setError(error));
        }
        descriptor.changeFieldTouched(true);
      });
      return !hasSomeError;
    };
  }
}

const forms: any = {};

export const generateForm = <FormValues, K extends keyof FormValues>(
  prefix: string,
  fields: K[],
  options: FormOptions<FormValues>): Form<FormValues, K> => {
  if (!forms[prefix]) {
    forms[prefix] = new Form<FormValues, K>(prefix, fields, options);
  }
  return forms[prefix];
};
