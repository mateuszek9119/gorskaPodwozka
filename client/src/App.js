import StartPage from './StartPage';
import Admin from './admin';
import InfoPage from './components/info/InfoPage';
import PrivacyPolicyPopup from './components/info/PrivacyPolicyPopup';
import PrivacyPolicy from './components/info/PrivacyPolicy';
import Rules from './components/info/Rules';
import './css/app.css';
import {Routes,Route} from "react-router-dom"
import Transparency from './components/info/Transparency';
import AboutMe from './components/info/AboutMe';
import CoffeePage from './components/info/CoffeePage';





function App() {
  return (
    <>      
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/info' element={<InfoPage />}/>
        <Route path='/info/o-mnie' element={<AboutMe />} />
        <Route path='/info/regulamin' element={<Rules />} />
        <Route path='/info/polityka-prywatnosci-popup' element={<PrivacyPolicyPopup />} />
        <Route path='/info/polityka-prywatnosci' element={<PrivacyPolicy />} />
        <Route path='/info/transparetnosc' element={<Transparency />} />
        <Route path='/info/postaw-kawe' element={<CoffeePage />} />
      </Routes>
    </>
  );
}

export default App;