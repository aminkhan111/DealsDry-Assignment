 
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
           
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
