import React from 'react';
import styles from '../css/search.module.css'

function SearchTrip({ query, setQuery, onSearch }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
   
      <input
        className={styles.searchTripsInput}
        type="text"
        placeholder="np. zakopane"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
  
  );
}

export default SearchTrip;
