import './App.css';
import Login from './Login/Login';
import ViewRequests from './ViewRequests/View';
import SubmitRequest from './SubmitRequest/Submit';
import EditRequest from './EditRequest/[id]/Edit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/view-requests' element={<ViewRequests />} />
          <Route path='/submit-request' element={<SubmitRequest />} />
          <Route path='/edit-request/:id' element={<EditRequest />} />
        </Routes>
      </Router>
  );
}

export default App;
