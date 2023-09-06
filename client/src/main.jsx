import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp.jsx";
import { SignIn } from "./pages/SignIn/SignIn.jsx";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { InfoPage } from "./pages/Info/InfoPage.jsx";
import { store } from "./store";
import { WatchPage } from "./pages/Watch/WatchPage.jsx";
import { SearchPage } from "./pages/Search/SearchPage.jsx";
import { ContentPage } from "./pages/ContentPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<App />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/:contentType" element={<ContentPage />} />
                <Route path="/content/:_id" element={<InfoPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
              <Route path="/content/:_id/movie" element={<WatchPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
