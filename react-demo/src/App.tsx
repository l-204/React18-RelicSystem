import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// 前台
import ClientHome from './pages/Client/Home';
import History from './pages/Client/History';
import Feedback from './pages/Client/Feedback';
// 后台
import AdminHome from './pages/Admin/Home';
import User from './pages/Admin/User';
import Manage from './pages/Admin/Manage';
import Apply from './pages/Admin/Apply';
import Audit from './pages/Admin/Audit';
import Setting from './pages/Admin/Setting';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ClientHome />} />
        <Route path="/history" element={<History />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/user" element={<User />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
