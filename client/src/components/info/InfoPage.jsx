import { Link } from 'react-router-dom';
import styles from '../../css/rulesAndPolicy.module.css'
import Bars from '../Bars';

function InfoPage() {
  return (

    <>

    <div className={styles.rulesAndPolicyConteiner}>
      
      <h3 className='userSelectNone' aria-label="Górska Podwózka">
        <img src="/logo/logoApp.png" alt="logo" className='logo'  />  GórskaPodwózka
      </h3>

      <p className='userSelectNone'><strong>GórskaPodwózka</strong> to darmowa platforma ogłoszeń przejazdów, która umożliwia wspólne i tańsze podróże w góry. Łączym kierowców i pasażerów z różnych zakątków Polski — bez rejestracji, bez opłat, szybko i wygodnie.</p>

      <div className={styles.note } >
        🔔 <strong>Bezpieczeństwo przede wszystkim!</strong> <p>Zanim wybierzesz się w trasę, upewnij się z kim jedziesz, sprawdź pojazd i ustal wszystkie szczegóły. GórskaPodwózka nie pośredniczy w umawianiu przejazdów.</p>
      </div>

      
      <p>🧗‍♂️ <Link className={styles.link} to="/info/o-mnie">Trochę słów o mnie 👋 ... </Link></p>
      

      <p style={{marginTop: '4vh',}}>
         Jeśli spodobała Ci się platforma i chcesz wesprzeć jej rozwój oraz zmotywować mnie bardziej do jej ulepszania i rozwijania możesz <strong> <Link to="/info/postaw-kawe" className={styles.infoLinkCoffe}>postawić mi kawę ☕ </Link></strong> 
      </p>
       


      <div className={styles.contactAdmin}>
        <p className='userSelectNone'><strong>Kilka ważnych informacji:</strong></p>
        <ul style={{marginTop: '0'}}>
          <li>📄 <Link className={styles.link} to="/info/regulamin">Regulamin korzystania z serwisu</Link></li>
          <li>🔒 <Link className={styles.link} to="/info/polityka-prywatnosci">Polityka prywatności</Link></li>
          <li>📖 <Link className={styles.link} to="/info/transparetnosc">Transparętność platformy</Link></li>
        </ul>
      </div>

      <div className={styles.contactAdmin} style={{marginTop: '0'}}>
          <p className='userSelectNone'><strong>Kontakt:</strong></p>
          <p>✉️ mateuszek9119@gmail.com</p>
      </div>


      <p className={styles.wrapperBackLink}>
        <Link className={styles.backLink} to="/">← Powrót</Link>
      </p>

    </div>

     <p className={styles.mycopyright}>
        © 2025 GórskaPodwózka — wszystkie prawa zastrzeżone, autor: Mateusz.
      </p>

      <Bars />

    </>
  );
}

export default InfoPage;
