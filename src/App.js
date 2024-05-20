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
import NewAuth from './components/NewAuth';
import NewContent from './components/NewContent';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       <Route path='' element={<Home/>}/>
       <Route path='/login' element={<NewAuth/>}/>
       <Route path='/schedule' element={<Schedule/>}/>
       <Route path='/interview' element={<Main/>}/>
       <Route path="/newAuth" element={<NewAuth/>}/>
       <Route path='/newContent' element={<NewContent/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
