import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import TripAdd from './components/TripAdd';
import TripsDisplay from './components/TripsDisplay';
import SearchTrip from './components/SearchTrip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';
import styles from './css/search.module.css';
import Bars from './components/Bars';


function StartPage() {
  
  axios.defaults.withCredentials = true;

  const LIMIT = 10;

  const isFirstRender = useRef(true)
  const searchInputRef = useRef(null);

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



  // Wykonaj przewijanie przy kliknięciu w input
  const handleFocus = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 238, // lub jakiś offset np. 100
      behavior: 'smooth',
    });
  }, 400);  // Pocz
  };


  const scrollToSearchInput = () => {
  if (searchInputRef.current) {
    const offset = -30; // można testowo zmienić na -200
    const top = searchInputRef.current.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top, behavior: 'smooth' });
  }
};

  


  return (
    <>

      <ToastContainer
        position="top-right"    // Toast wyświetla się na górze
        autoClose={2000}
        hideProgressBar={true}
        limit={3}
        style={{
          marginTop: '28vh',
          zIndex: 9999,         // Upewniamy się, że toast jest na wierzchu
          pointerEvents: 'none', // Upewniamy się, że toast nie blokuje interakcji
        }}
      />
     
    <div className="container" >

      {/* ⬇️ to owijamy i nadajemy rozmycie */}


      <div className={`mainContent ${addSection ? 'blurred' : ''}`}>

      <Bars onAddClick={() => setAddSection(true)} onSearchClick={scrollToSearchInput} />
      


        <h1 className="h1-header userSelectNone"  aria-label="Górska Podwózka">
       
            <img src="/logo/logoApp.png" alt="logo"  className="logo"  />  
            GórskaPodwózka
                   
        </h1>

        <p className="sub-header userSelectNone">
          Jedziesz w góry? Znajdź przejazd lub dodaj swój i zabierz kogoś !
        </p>

        <button className="btn" onClick={() => setAddSection(true)}>Dodaj Przejazd</button>

        <div className={styles.sectionSearchTrip} ref={searchInputRef}>
          <p className='userSelectNone'>Wyszukiwarka po miejscowośći</p>
          <SearchTrip query={searchQuery} setQuery={setSearchQuery} handleFocus={handleFocus}  />
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
