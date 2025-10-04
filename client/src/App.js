import StartPage from './StartPage';
import Admin from './admin';
import TestPage from './TestPage';
import './css/app.css';
import {Routes,Route} from "react-router-dom"



function App() {
  return (
    <>      
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/testPAge' element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;