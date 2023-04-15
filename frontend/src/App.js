import Navbar  from './components/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About'
import Regression from './components/Regression';
import Classification from './components/Classification';
import Login from './components/Login';


function App() {


  return (
    <div className="App">
      <Router>
      <Routes>
          <Route exact path="/" element={<Login/>} />   
          
          <Route path="/home" element={<><Navbar /><Home/></>}  />
          <Route path="/about" element={<><Navbar /><About/></>} />
          <Route path="/regression" element={<><Navbar /><Regression/></>}/>
          <Route path='/classification' element={<><Navbar /><Classification/></>}/>

      </Routes>

      </Router>
    </div>
  );
}

export default App;