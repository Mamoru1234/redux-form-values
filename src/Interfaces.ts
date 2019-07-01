export interface FormFieldImplProps<T> {
  value: T;
  errorMessage?: string;
  onBlur?: (e: any) => void;
  onChange: (value: T, event?: any) => void;
}

export interface FormFieldState<T> {
  value: T;
  errorMessage?: string;
  initialValue?: T;
  touched: boolean;
  validator: (value: T) => string;
}

export interface FieldDescriptor<FieldType> {
  fieldStateSelector: (state: any) => FormFieldState<FieldType>;
  changeField(value: FieldType): any;
  changeFieldTouched(newValue: boolean): void;
}

export interface FormFieldOptions {
  initialOnChangeValidation?: boolean;
  includeProps?: string[];
  wait?: number;
}

export interface OwnFormFieldWrapperProps<T> {
  descriptor: FieldDescriptor<T>;
}

export interface FormFieldWrapperState<T> {
  value: T;
}

export interface FormFieldWrapperProps<T> extends OwnFormFieldWrapperProps<T> {
  value: T;
  touched: boolean;
  errorMessage?: string;
  changeFieldTouched: (newValue: boolean) => void;
  changeField: (value: T) => any;
}
