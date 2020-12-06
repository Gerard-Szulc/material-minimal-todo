import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import React from "react";
import configureStore from "./store/configureStore.js";
import mySaga from "./sagas/saga.js";

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
