import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/fragments/Navbar';
import Homepage from './pages/Homepage';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/history' element={<h1>history page</h1>} />
        <Route path='/display' element={<h1>display page</h1>} />
      </Routes>
    </Router>
  )
}

export default App
