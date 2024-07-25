import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  AppProvider,
  ConfigProvider,
  FormProvider,
  MDProvider,
} from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MDProvider>
      <ConfigProvider>
        <AppProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </AppProvider>
      </ConfigProvider>
    </MDProvider>
  </React.StrictMode>
);
