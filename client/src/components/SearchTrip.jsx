import React from 'react';
import styles from '../css/search.module.css'

function SearchTrip({ query, setQuery, handleFocus }) {
  

  return (
   
      <input
        className={styles.searchTripsInput}
        type="text"
        placeholder="np. zakopane"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
      />
  
  );
}

export default SearchTrip;
