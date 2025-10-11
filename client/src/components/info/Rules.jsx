import { Link } from 'react-router-dom';
import BottomsBar from '../BottomsBar';
import styles from '../../css/rulesAndPolicy.module.css'

function Rules( ) {

  return (

    <div className={styles.rulesAndPolicyConteiner} >

      <h3>Regulamin</h3>

      <p><strong>1.</strong> Serwis GórskaPodwózka jest platformą ogłoszeniową służącą do dodawania i wyszukiwania przejazdów w góry.</p>

      <p><strong>2.</strong> Użytkownicy korzystają z serwisu na własną odpowiedzialność. Twórca serwisu nie ponosi odpowiedzialności za jakość, bezpieczeństwo i realizację przejazdów.</p>

      <p><strong>3.</strong> Dodając ogłoszenie, użytkownik oświadcza, że podane dane są zgodne z prawdą, nie naruszają prawa oraz że posiada niezbędne uprawnienia do prowadzenia pojazdu.</p>

      <p><strong>4.</strong> Użytkownik odpowiada za stan techniczny pojazdu oferowanego w ogłoszeniu oraz za przestrzeganie przepisów ruchu drogowego podczas realizacji przejazdu.</p>

      <p><strong>5.</strong> Serwis nie odpowiada za przebieg wyprawy, warunki atmosferyczne ani bezpieczeństwo na trasie (drodze, szlaku).</p>

      <p><strong>6.</strong> Serwis nie przetwarza danych osobowych poza tymi, które użytkownik samodzielnie publikuje w ogłoszeniu.</p>

      <p><strong>7.</strong> Serwis zastrzega sobie prawo do usunięcia ogłoszeń niezgodnych z regulaminem lub naruszających dobre obyczaje.</p>

      <p><strong>8.</strong> Korzystając z serwisu, użytkownik zobowiązuje się do przestrzegania wszystkich powyższych zasad.</p>

      <p className={styles.wrapperBackLink}>
        <Link className={styles.backLink} to="/info">
          ← Powrót
        </Link>
      </p>

      <BottomsBar />

    </div>
  );
}

export default Rules;