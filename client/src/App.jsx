import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

function App() {

  return (
    <div className='App'>
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
    </div>
  )
}

export default App
