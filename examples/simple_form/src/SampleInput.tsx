import * as React from 'react';
import {formField} from 'redux-form-values/FormField';

interface Props {
  className?: string;
  value: string;
  onChange: (value: string, e: any) => void;
}

class SampleInput extends React.PureComponent<Props> {
  public onChange = (e: any) => {
    this.props.onChange(e.target.value, e);
  };
  public render() {
    const { value, className } = this.props;
    return (
      <input
        className = {className}
        value = {value}
        onChange = {this.onChange}
      />
    );
  }
}

export default formField(SampleInput);
