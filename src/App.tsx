import React from "react";
import i18n from 'i18next';
import "./assets/styles/style.sass";
import Header from "./components/Header";
import TicketsPage from "./pages/TicketsPage";
import NumeralHooks from "./hooks/numeral.hooks";
import translations from "./translation/index";

const LOCALE_NAME = "customLocale";
const DEFAULT_LANGUAGE = "ua";

const App = (): JSX.Element => {
  NumeralHooks.useSetCustomLocale(LOCALE_NAME);
  i18n.init({ fallbackLng: DEFAULT_LANGUAGE, resources: translations });

  return (
    <>
      <Header></Header>
      <TicketsPage></TicketsPage>
    </>
  );
};

export default App;
