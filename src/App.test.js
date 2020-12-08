import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import React from "react";
import configureStore from "./store/configureStore.js";
import mySaga from "./sagas/saga.js";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

test('renders learn react link', () => {

  const store = configureStore()
  store.runSaga(mySaga)

  render(
      <Provider store={store}>

      <App />
      </Provider>
      );
  const titleElement = screen.getByText(/Minimal-Todo/i);
  expect(titleElement).toBeInTheDocument();
});
