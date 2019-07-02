import {applyMiddleware, compose, combineReducers, createStore, Store} from 'redux';
import {AppState} from './AppState';
import FormFieldsReducer from 'redux-form-values/FormFieldReducer';
import ReduxThunk from 'redux-thunk';

export const createAppStore = (): Store<AppState> => {
  const devToolsHandler = window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer: (action: any) => {
      const type = action.type.toString();
      return { ...action, type };
    },
  });
  return createStore(combineReducers<AppState>({
    fields: FormFieldsReducer,
  }), compose(applyMiddleware(ReduxThunk), devToolsHandler));
};

export const store: Store<AppState> = createAppStore();
