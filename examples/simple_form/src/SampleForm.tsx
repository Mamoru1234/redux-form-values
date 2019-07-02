import * as React from 'react';
import SampleInput from './SampleInput';
import {Form} from 'redux-form-values/FormUtils';
import {store} from './ReduxStore';

interface FormData {
  sample: string;
}

const form = new Form<FormData, keyof FormData>(
  'randomForm',
  [
    'sample',
  ],
  {
    defaultValues: {
      sample: '',
    },
  },
);

class SampleForm extends React.PureComponent {
  constructor(props: {}) {
    super(props);
    store.dispatch<any>(form.initValues());
    setTimeout(() => {
      store.dispatch<any>(form.initValues(undefined, {
        resetIfExists: true,
      }));
    }, 10000);
  }
  public render() {
    return (
      <div>
        <SampleInput
          descriptor = {form.descriptors.sample}
        />
      </div>
    );
  }
}

export default SampleForm;
