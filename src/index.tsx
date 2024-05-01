import React from "react"
import { createRoot } from "react-dom/client"
import {Provider} from 'react-redux'
import { store } from './redux/store';

import App from "./App"

const rootEl = document.querySelector("#root")
if (!rootEl) throw new Error("Cannot find root element with that id")
const root = createRoot(rootEl)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
