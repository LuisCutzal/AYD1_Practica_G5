import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//local imports
import Home from './pages/Home'
import Login from './pages/Login'


function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (


    <Router>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route

          path="/"

          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}

        />

      </Routes>

    </Router>
  )
}

export default App