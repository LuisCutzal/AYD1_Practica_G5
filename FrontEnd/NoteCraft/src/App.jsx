import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect,useState} from 'react';

//local imports
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica la autenticación al montar el componente
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  return (


    <Router>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route

          path="/"

          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}

        />

      </Routes>

    </Router>
  )
}

export default App