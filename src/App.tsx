import './App.css';
import Navbar from './components/Navbar';
import Team from './pages/Team';
import User from './pages/User';
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {

  return (
    <div className='min-w-full min-h-screen bg-slate-800 text-slate-300'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/teams' element={<Team />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
