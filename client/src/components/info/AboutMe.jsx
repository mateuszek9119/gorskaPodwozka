import { Link } from 'react-router-dom';
import styles from '../../css/rulesAndPolicy.module.css';
import BottomsBar from '../BottomsBar';

function AboutMe() {
  return (
    <div className={styles.rulesAndPolicyConteiner}>
      <h3>O mnie</h3>

      <p>
        Cześć! Mam na imię Mateusz. Od kilku lat jedną z moich pasji są górskie wędrówki — głównie po Tatrach. Poza tym lubię jeździć na rowerze, biegać i ćwiczyć.
      </p>

      <p>
        Pomyślałem o stworzeniu tej platformy, aby ułatwić ludziom wspólne podróże w góry — bez rejestracji, bez aplikacji, prosto i wygodnie.
      </p>

      <p>
        W planach mam rozbudowę strony m.in. o możliwość wspólnego umawiania się na szlak i inne ciekawe funkcje.
      </p>

      <p>
        Jeśli chcesz mnie zmotywować do dalszego rozwoju projektu, możesz postawić mi kawę ☕ — będzie mi bardzo miło!
      </p>

      <div className={styles.contactAdmin}>
        <p><strong>Kontakt:</strong></p>
        <p>📸 @ma_te_uusz</p>
        <p>✉️ mateuszek9119@gmail.com</p>
      </div>

        
      
      
      

      <p className={styles.wrapperBackLink}>
        <Link className={styles.backLink} to="/info">← Powrót</Link>
      </p>

      <BottomsBar />
    </div>
  );
}

export default AboutMe;
