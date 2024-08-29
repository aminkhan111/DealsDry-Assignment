 
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
 
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      
      

      
      <BrowserRouter>

      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Auth-related routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />

          {/* Employee management-related routes */}
          <Route path="/employee" element={<PrivateRoute element={<EmployeeManagementApp />} />} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
