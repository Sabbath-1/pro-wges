import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register'; 
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { Route, Routes, Navigate } from 'react-router-dom'
import './index.css';

function App() {
  return (
   <Routes>
    {/* Public routes - if logged in, redirect to dashboard */}
    <Route path='/register' element={
      <PublicRoute>
        <Register/>
      </PublicRoute>
    }/>
    
    <Route path='/login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    }/>
    
    {/* Protected routes - require authentication */}
    <Route path='/dashboard' element={
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    }>
      <Route index element={<Dashboard/>}/>
    </Route>

    {/* Default redirect to dashboard */}
    <Route path='/' element={<Navigate to="/dashboard" replace />} />
    
    {/* Catch all - redirect to login */}
    <Route path='*' element={<Navigate to="/login" replace />} />
   </Routes>
  );
}

export default App;