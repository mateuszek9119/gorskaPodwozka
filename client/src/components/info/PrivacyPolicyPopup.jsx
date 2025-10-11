import React from 'react';
import styles from '../../css/rulesAndPolicy.module.css'

const PrivacyPolicyPopup = () => {
  
  return (

    <div className={styles.rulesAndPolicyConteiner}>

      <h3>Polityka prywatności</h3>
     
      <p><strong>1. Administrator danych</strong><br />
      Administratorem danych osobowych jest twórca serwisu, kontakt: mateuszek9119@gmail.com.</p>

      <p><strong>2. Zakres zbieranych danych</strong><br />
      Zbieramy dane osobowe podane dobrowolnie przez użytkowników podczas dodawania przejazdu, takie jak: imię, zdjęcie, dane kontaktowe (telefon, Instagram, Messenger) oraz informacje o trasie i terminie wyjazdu.</p>

      <p><strong>3. Cel przetwarzania danych</strong><br />
      Dane są przetwarzane wyłącznie w celu publikacji przejazdów i umożliwienia kontaktu pomiędzy użytkownikami serwisu.</p>

      <p><strong>4. Podstawa prawna</strong><br />
      Przetwarzanie odbywa się na podstawie zgody użytkownika (art. 6 ust. 1 lit. a RODO), wyrażonej poprzez zaakceptowanie polityki prywatności.</p>

      <p><strong>5. Okres przechowywania danych</strong><br />
      Dane są przechowywane przez okres niezbędny do realizacji celu, a po upływie terminu wyjazdu dane zostaną usunięte automatycznie.</p>

      <p><strong>6. Prawa użytkownika</strong><br />
      Użytkownik ma prawo do dostępu do swoich danych, ich poprawienia oraz żądania usunięcia. W przypadku chęci realizacji tych praw prosimy o kontakt na adres e-mail podany powyżej. Obecnie nie ma możliwości samodzielnej edycji ani usunięcia danych w serwisie.</p>

      <p><strong>7. Udostępnianie danych</strong><br />
      Dane nie są przekazywane podmiotom trzecim poza tymi, które świadczą usługi niezbędne do działania serwisu (np. hosting).</p>

      <p><strong>8. Bezpieczeństwo danych</strong><br />
      Dbamy o bezpieczeństwo danych osobowych stosując odpowiednie środki techniczne i organizacyjne.</p>

      <p><strong>9. Kontakt</strong><br />
      W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem: mateuszek9119@gmail.com.</p>

      <p>Dziękujemy za korzystanie z serwisu Górska Podwózka.</p>

    </div>

  );
};

export default PrivacyPolicyPopup ;
