import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/register";
import ForgotPassword from "./components/resetpassword";
import PhoneVerify from "./components/phoneverify";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/verify' element={<PhoneVerify />} />
          </Routes>
      </BrowserRouter>
  );
}
export default App;
