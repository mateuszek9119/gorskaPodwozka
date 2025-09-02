import Admin from './admin';
import './css/app.css';
import {Routes,Route} from "react-router-dom"
import StartPage from './StartPage';


function App() {
  return (
    <>      
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;