import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/fragments/Navbar';
import Homepage from './pages/Homepage';
import Display from './pages/Display';
import History_page from './pages/History';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/history' element={<History_page/>}/>
        <Route path='/display' element={<Display/>} />
      </Routes>
    </Router>
  )
}

export default App
