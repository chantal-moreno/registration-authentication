import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;

