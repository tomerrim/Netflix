import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp.jsx'
import { SignIn } from './pages/SignIn.jsx'
import { HomePage } from "./pages/HomePage.jsx"
import { InfoPage } from './pages/InfoPage.jsx'
import { store } from "./store"
import { WatchPage } from './pages/WatchPage.jsx'

axios.defaults.baseURL = "http://localhost:8000/api";

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
                <Route path="/content/:_id" element={<InfoPage />} />
              </Route>
              <Route path="/content/:_id/trailer" element={<WatchPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
