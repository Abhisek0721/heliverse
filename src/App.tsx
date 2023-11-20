import './App.css';
import Navbar from './components/Navbar';
import User from './pages/User';

function App() {

  return (
    <div className='min-w-full min-h-screen bg-slate-800 text-slate-300'>
      <Navbar />
      <User />
    </div>
  )
}

export default App
