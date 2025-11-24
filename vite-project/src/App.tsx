import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members'; 
import Payments from './pages/Payments';
import Benefits from './pages/Benefits';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
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
        <Layout>
          <Dashboard/>
        </Layout>
      </ProtectedRoute>
    }/>
    
    <Route path='/members' element={
      <ProtectedRoute>
        <Layout>
          <Members/>
        </Layout>
      </ProtectedRoute>
    }/>

    <Route path='/payments' element={
      <ProtectedRoute>
        <Layout>
          <Payments/>
        </Layout>
      </ProtectedRoute>
    }/>

    <Route path='/benefits' element={
      <ProtectedRoute>
        <Layout>
          <Benefits/>
        </Layout>
      </ProtectedRoute>
    }/>

    <Route path='/reports' element={
      <ProtectedRoute>
        <Layout>
          <Reports/>
        </Layout>
      </ProtectedRoute>
    }/>

    <Route path='/settings' element={
      <ProtectedRoute>
        <Layout>
          <Settings/>
        </Layout>
      </ProtectedRoute>
    }/>

    {/* Default redirect to dashboard */}
    <Route path='/' element={<Navigate to="/dashboard" replace />} />
    
    {/* Catch all - redirect to dashboard */}
    <Route path='*' element={<Navigate to="/dashboard" replace />} />
   </Routes>
  );
}

export default App;