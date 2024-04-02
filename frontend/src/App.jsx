import './App.css'
import DashboardLayout from './containers/DashboardLayout/DashboardLayout';
import LoginForm from './components/LoginForm/Login';
import RegistrationForm from './components/RegistrationForm/Registration';
import RequireAuth from './components/RequireAuth';
import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public */}
        <Route path='login' element={<LoginForm />} />

        {/* Private */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<DashboardLayout />} />
          <Route path='/registration' element={<RegistrationForm />} />
        </Route>

        {/* Others */}
      </Route>
    </Routes>
  )
}

export default App;
