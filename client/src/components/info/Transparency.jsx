import { Link } from 'react-router-dom';
import styles from '../../css/rulesAndPolicy.module.css'
import BottomsBar from '../BottomsBar';

function Transparency() {
  
  return (

    <div className={styles.rulesAndPolicyConteiner}>
      
      <h3>
        Transparentność platformy
      </h3>

      <p>GórskaPodwózka to prosta i otwarta platforma ogłoszeń. Dbamy o przejrzystość i uczciwość działania:</p>

      <ul>
        <li>🔹 Serwis nie wymaga logowania ani zakładania konta.</li>
        <li>🔹 Nie pobiera żadnych opłat ani prowizji – korzystanie jest całkowicie darmowe, natomiast dobrowolnie możesz postawić mi kawę na rozwój i opłaty płynące z utrzymania strony ☕.</li>
        <li>🔹 Nie zbiera ani nie przetwarzamy danych osobowych użytkowników.</li>
        <li>🔹 Ogłoszenia są sortowane wyłącznie chronologicznie – według daty dodania.</li>
        <li>🔹 Nie stosuje algorytmów rankingujących, reklam ani systemów płatnej promocji.</li>
      </ul>
    
      <p style={{ marginTop: '4vh' }}>
        Celem serwisu jest ułatwienie wspólnych przejazdów w góry – w sposób prosty, niezależny i przejrzysty. 🏔️
      </p>

      <p className={styles.wrapperBackLink}>
        <Link className={styles.backLink} to="/info">
          ← Powrót
        </Link>
      </p>

      <BottomsBar />

    </div>
  );
}

export default Transparency;
