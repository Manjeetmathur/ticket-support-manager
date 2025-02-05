import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import RouterProtect from './Components/RouterProtect/RouterProtect'
function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<RouterProtect><Dashboard/></RouterProtect> }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
