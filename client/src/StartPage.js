import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import TripAdd from './components/TripAdd';
import TripsDisplay from './components/TripsDisplay';
import SearchTrip from './components/SearchTrip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';
import styles from './css/search.module.css';

function StartPage() {
  axios.defaults.withCredentials = true;

  const isFirstRender = useRef(true)
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const LIMIT = 10;

  const fetchTrips = async () => {

    setLoading(true);
    setIsSearching(false);
    setPage(1);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/trips?page=1&limit=${LIMIT}`);
      setTrips(res.data.data);
      setFilteredTrips([]);
      setHasMore(res.data.total > LIMIT);
    } catch {
      toast.error('Nie udało się załadować przejazdów.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {

    if (searchQuery.trim() === '') {
      fetchTrips();
      return;
    }

    if (searchQuery.length < 3) return;

    setLoading(true);
    setIsSearching(true);
    setPage(1);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/trips?name=${encodeURIComponent(searchQuery)}&page=1&limit=${LIMIT}`);
      setFilteredTrips(res.data.data);
      setHasMore(res.data.total > res.data.data.length);
      setLastSearchedQuery(searchQuery); // ⬅️ ustaw dopiero po odpowiedzi
      if (res.data.data.length === 0) {
        toast.info(<>Brak przejazdów dla: " <i>{searchQuery}</i> "</>);
      } else {
        
        toast.success(
          <>
            Ilość przejazdów dla " <i>{searchQuery}</i> " : {res.data.data.length}
          </>
        );
      }

    } catch {
      toast.error('Błąd podczas wyszukiwania.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // nie uruchamiaj debounce na pierwszy render
  }

  const debounce = setTimeout(() => {
    handleSearch();
  }, 800);

  return () => clearTimeout(debounce);
}, [searchQuery]);
 

  useEffect(() => {
    fetchTrips();
  }, []);

  const loadMoreTrips = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/trips?page=${nextPage}&limit=${LIMIT}`);
      setTrips(prev => [...prev, ...res.data.data]);
      setPage(nextPage);
      setHasMore((nextPage * LIMIT) < res.data.total);
    } catch {
      toast.error('Błąd przy ładowaniu kolejnych przejazdów.');
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMoreFilteredTrips = async () => {
    if (loadingMore || !searchQuery.trim()) return;
    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/trips?name=${encodeURIComponent(searchQuery)}&page=${nextPage}&limit=${LIMIT}`);
      setFilteredTrips(prev => [...prev, ...res.data.data]);
      setPage(nextPage);
      setHasMore(nextPage * LIMIT < res.data.total);
    } catch {
      toast.error('Błąd przy ładowaniu wyników.');
    } finally {
      setLoadingMore(false);
    }
  };


  // Funkcja wykrywająca klawiaturę
  const checkKeyboardVisibility = () => {
    const height = window.innerHeight;
    const docHeight = document.documentElement.clientHeight;
    if (height < docHeight) {
      setKeyboardVisible(true); // Klawiatura jest widoczna
    } else {
      setKeyboardVisible(false); // Klawiatura jest schowana
    }
  };

  // Monitorowanie zmiany wysokości okna
  useEffect(() => {
    window.addEventListener('resize', checkKeyboardVisibility);
    checkKeyboardVisibility(); // Sprawdzamy przy pierwszym renderze

    return () => {
      window.removeEventListener('resize', checkKeyboardVisibility);
    };
  }, []);



  return (
    <>

   <ToastContainer
        position="bottom-center" // Ustawiamy toast na dole
        autoClose={2000}
        hideProgressBar={true}
        limit={3}
        style={{
          position: 'fixed',
          bottom: keyboardVisible ? '50px' : '20px', // Jeżeli klawiatura widoczna, to odstęp od dołu większy
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

     
    <div className="container" >




      {/* ⬇️ to owijamy i nadajemy rozmycie */}

      <div className={`mainContent ${addSection ? 'blurred' : ''}`}>
        <h1 className="h1-header" aria-label="Górska Podwózka">GórskaPodwózka</h1>
        <p className="sub-header">
          Jedziesz w góry? Znajdź przejazd lub dodaj swój i zabierz kogoś !
        </p>
        <button className="btn" onClick={() => setAddSection(true)}>Dodaj Przejazd</button>

        <div className={styles.sectionSearchTrip}>
          <p>Wyszukiwarka po miejscowośći</p>
          <SearchTrip query={searchQuery} setQuery={setSearchQuery} />
        </div>
        
        {loading && <p className="loading-spinner">Ładowanie przejazdów...</p>}

        {!loading && (
          <TripsDisplay
            trips={isSearching ? filteredTrips : trips}
            loadMore={isSearching ? loadMoreFilteredTrips : loadMoreTrips}
            hasMore={hasMore}
            loading={loadingMore}
          />
        )}

        {!loading &&
          isSearching &&
          searchQuery === lastSearchedQuery &&
          filteredTrips.length === 0 &&
          searchQuery.trim().length >= 3 && (
            <p style={{ marginTop: '4vh' }}>
              Brak przejazdów dla: <strong>{searchQuery}</strong>
            </p>
        )}

        {loadingMore && <p>Ładowanie kolejnych przejazdów...</p>}
      </div>

      {/* ⬇️ To NIE jest rozmywane */}
      {addSection && (
        <TripAdd fetchTrips={fetchTrips} handleCloseForm={() => setAddSection(false)} />
      )}
    </div>

  
  </>
  );
}

export default StartPage;
