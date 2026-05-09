import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from '../src/Components/Users';
import Login from '../src/Components/Login';
import Create from '../src/Components/CreateUser';
import Header from '../src/Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
}

export default App;
