import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import './App.css'
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
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
