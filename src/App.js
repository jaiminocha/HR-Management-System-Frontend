import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import CustomNavbar from './Components/CustomNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './Components/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';
import ProfileInfo from './Components/User-routes/ProfileInfo';
import Contact from './Components/Contact';

function App() {
  return (
    <div className="App">
      <CustomNavbar />
    
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='login' element={<Login /> } />
          <Route path='about' element={<About /> } />
          <Route path='contact' element={<Contact /> } />
          <Route path='user' element={<PrivateRoute />}>
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='profile' element={<ProfileInfo />} />
          </Route>
        </Routes>
        <Footer />
     
    </div>
  );
}

export default App;
