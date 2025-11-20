import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from '../src/components/Login';
import Register from './components/Register'; 
import { Route, Routes } from 'react-router-dom'
import './index.css';

function App() {
  return (
   <>
   <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
    </Route>
   </Routes>
   </>
  );
}

export default App;