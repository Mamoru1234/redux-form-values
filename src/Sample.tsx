import * as React from 'react';
import {formField} from './FormField';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

class Sample extends React.PureComponent<Props> {
  public render() {
    return (
      <div>
        Sample
      </div>
    );
  }
}

export default formField(Sample);
