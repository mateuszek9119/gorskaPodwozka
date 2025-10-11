import { Link } from 'react-router-dom';
import BottomsBar from '../BottomsBar';
import styles from '../../css/rulesAndPolicy.module.css'

function InfoPage() {
  return (

    <div className={styles.rulesAndPolicyConteiner}>
      
      <h3 aria-label="Górska Podwózka">
        <img src="/logo/logoApp.png" alt="logo" className='logo'  />  GórskaPodwózka
      </h3>

      <p><strong>GórskaPodwózka</strong> to darmowa platforma ogłoszeń, która umożliwia wspólne podróże w góry. Łączym kierowców i pasażerów z różnych zakątków Polski — bez rejestracji, bez opłat, szybko i wygodnie.</p>

      <div className={styles.note} >
        🔔 <strong>Bezpieczeństwo przede wszystkim!</strong> <p>Zanim wybierzesz się w trasę, upewnij się z kim jedziesz, sprawdź pojazd i ustal wszystkie szczegóły. GórskaPodwózka nie pośredniczy w umawianiu przejazdów.</p>
      </div>

      <ul>
        <li>👤 <Link className={styles.link} to="/info/o-mnie">Trochę o mnie</Link></li>
      </ul>

      <p>
         Jeśli spodobała Ci się platforma i chcesz wesprzeć jej rozwój oraz zmotywować mnie bardziej do jej ulepszania możesz <Link to="/info/postaw-kawe" className={styles.infoLinkCoffe}>postawić mi kawę ☕ </Link>
      </p>

      <div className={styles.contactAdmin}>
        <p><strong>Ważne:</strong></p>
        <ul style={{marginTop: '0'}}>
          <li>📄 <Link className={styles.link} to="/info/regulamin">Regulamin korzystania z serwisu</Link></li>
          <li>🔒 <Link className={styles.link} to="/info/polityka-prywatnosci">Polityka prywatności</Link></li>
          <li>📖 <Link className={styles.link} to="/info/transparetnosc">Transparętność platformy</Link></li>
        </ul>
      </div>

      <div className={styles.contactAdmin} style={{marginTop: '0'}}>
          <p><strong>Kontakt:</strong></p>
          <p>✉️ mateuszek9119@gmail.com</p>
      </div>


      <p className={styles.wrapperBackLink}>
        <Link className={styles.backLink} to="/">← Powrót</Link>
      </p>

      <p className={styles.mycopyright}>
        © 2025 GórskaPodwózka — wszystkie prawa zastrzeżone. Projekt i realizacja: Mateusz
      </p>

      <BottomsBar />
      
    </div>
  );
}

export default InfoPage;
