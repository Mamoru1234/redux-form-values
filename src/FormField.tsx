import * as React from 'react';
import {
  FormFieldImplProps,
  FormFieldOptions,
  FormFieldWrapperProps,
  FormFieldWrapperState,
  OwnFormFieldWrapperProps
} from './Interfaces';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

const OMITTED_PROPS = [
  'changeField',
  'changeFieldTouched',
  'descriptor',
  'dispatch',
  'touched',
];

export function formField<T>(
  DecoratedComponent: React.ComponentType<FormFieldImplProps<T>>,
  {
    initialOnChangeValidation = false,
    wait = 200,
  }: FormFieldOptions = {}
  ): React.ComponentType<Omit<T, keyof FormFieldImplProps<T>> & OwnFormFieldWrapperProps<T>> {

  type OwnProps = Omit<FormFieldImplProps<T>, keyof FormFieldImplProps<T>> & OwnFormFieldWrapperProps<T>;

  type MergedFormFieldWrapperProps<T> = Omit<FormFieldImplProps<T>, keyof FormFieldImplProps<T>> & FormFieldWrapperProps<T>;

  class FormField extends React.PureComponent<MergedFormFieldWrapperProps<T>, FormFieldWrapperState<T>> {
    private changing: boolean = false;
    private readonly parentCallBack: any;
    constructor(props: MergedFormFieldWrapperProps<T>) {
      super(props);
      this.state = {
        value: this.props.value,
      };
      this.parentCallBack = debounce(() => {
        this.changing = false;
        const { value } = this.state;
        this.props.changeField(value);
      }, wait);
    }
    public onChange = (value: T, e?: any): void => {
      const stateUpdate: any = {
        value,
      };
      if (initialOnChangeValidation) {
        this.props.changeFieldTouched(true);
      }
      this.setState(stateUpdate, () => {
        this.changing = true;
        this.parentCallBack(stateUpdate, e);
      });
    }
    public onBlur = () => {
      this.props.changeFieldTouched(true);
    }
    public render() {
      const props: any = omit(this.props, OMITTED_PROPS);
      const { touched } = this.props;
      const errorMessage = touched
        ? this.props.errorMessage
        : null;
      return (
        <DecoratedComponent
          {...props}
          errorMessage = {errorMessage}
          value = {this.state.value}
          onChange = {this.onChange}
          onBlur = {this.onBlur}
        />
      )
    }
  }
  const mapStateToProps = (state: any, props: OwnProps) => {
    const fieldState = props.descriptor.fieldStateSelector(state);
    return ({
      errorMessage: fieldState.errorMessage,
      value: fieldState.value,
      touched: fieldState.touched,
    });
  };

  const mapDispatchToProps = (dispatch: any, props: OwnProps) => (bindActionCreators({
    changeField: props.descriptor.changeField,
    changeFieldTouched: props.descriptor.changeFieldTouched,
  }, dispatch));

  return connect<any, any, OwnProps>(mapStateToProps, mapDispatchToProps)(FormField as any) as any;
}
