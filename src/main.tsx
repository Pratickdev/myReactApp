import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../src/redux/store.ts";
import { Provider } from "react-redux";
import Layout from "./Layout.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
