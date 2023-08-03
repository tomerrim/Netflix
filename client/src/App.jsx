import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Provider } from 'react-redux';
import { store } from "./store";

function App() {

  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <main>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/signin' element={<SignIn/>}/>
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
