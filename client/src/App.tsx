import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/fragments/Navbar';
import Homepage from './pages/Homepage';
import Display from './pages/Display';


function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/history' element={<h1>history page</h1>}/>
        <Route path='/display' element={<Display/>} />
      </Routes>
    </Router>
  )
}

export default App
