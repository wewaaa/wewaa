import './App.css';
import { Route,Routes,Link} from 'react-router-dom';
import UploadPage from  './pages/UploadPage';
import SignPage from './pages/SignPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage'
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/SignPage" element={<SignPage/>}/>
        <Route path="/UploadPage" element={<UploadPage/>}/>
      </Routes>
    </div>
    // exact true를통해 /와 /login or /signpage의 중복을 방지
  );
}

export default App;
