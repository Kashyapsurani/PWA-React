import './App.css'
import Header from './components/Header'
import UserConnect from './components/UserConnect'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/user-connect" element={<UserConnect />} />
        <Route path="/favorites" element={<div>Favorites Page</div>} />
        <Route path="/cart" element={<div>Cart Page</div>} />
      </Routes>

    </Router>
  )
}

export default App;
