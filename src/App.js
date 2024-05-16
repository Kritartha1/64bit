import logo from './logo.svg';
import './App.css';
import ExampleComponent from './components/Test';
import Main from './components/Main';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Schedule from './components/Schedule';
import MainNew from './components/MainNew';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       <Route path='' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Register/>}/>
       <Route path='/schedule' element={<Schedule/>}/>
       <Route path='/interview' element={<MainNew/>}/>
       {/* <Route path="/new" element={<MainNew/>}/> */}
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
