export interface FormFieldImplProps<T> {
  value: T;
  errorMessage?: string;
  onBlur?: (e: any) => void;
  onChange: (value: T, event?: any) => void;
}

export interface FormFieldState<T> {
  value: T;
  errorMessage?: string;
  initialValue: T;
  touched: boolean;
}

export interface FieldDescriptorOptions<T> {
  defaultValue:T;
  validator?: FieldValidator<T>;
}

export interface FieldInitOptions {
  resetIfExists?: boolean;
}

export interface FieldDescriptor<FieldType> {
  fieldStateSelector: (state: any) => FormFieldState<FieldType>;
  initField(state: Partial<FormFieldState<FieldType>>, options?: FieldInitOptions): void;
  setError(errorMessage?: string): void;
  changeField(value: FieldType): any;
  changeFieldTouched(newValue: boolean): void;
  destroy(): void;
}

export type FieldValidator<T> = (value: T, state?: any) => string | undefined

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
