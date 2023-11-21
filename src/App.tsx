import './App.css';
import Navbar from './components/Navbar';
import User from './pages/User';
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {

  return (
    <div className='min-w-full min-h-screen bg-slate-800 text-slate-300'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
