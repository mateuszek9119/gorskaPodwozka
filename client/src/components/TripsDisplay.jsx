import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookMessenger } from 'react-icons/fa';


function TripsDisplay({ trips = [], loadMore, hasMore, loading, isAdmin = false, fetchTrips }) {
  
  const [zoomedTripId, setZoomedTripId] = useState(null);
  const [showContact, setShowContact] = useState({});
  const [showDescription, setShowDescription] = useState({});

  const toggleZoom = (id) => {
    setZoomedTripId(zoomedTripId === id ? null : id);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('zoomedOverlay')) {
      setZoomedTripId(null);
    }
  };

  const handleDeleteTrip = async (id) => {
    const del = await axios.delete(`${process.env.REACT_APP_API_URL}/admin-api/delete/${id}`, { withCredentials: true });
    if (del.data.success) {
      fetchTrips();
      alert(del.data.message);
    }
  };

  return (
    <>
      {trips.map((trip) => {
        
        const midCities = trip.cities ? trip.cities.split(',') : [];
        const cityList = [
          `🚗 ${trip.cityStart}`,
          ...midCities.map(city => (city.trim() )),
          `${trip.cityEnd} 🏔️`,
        ];

        const dateStart = moment(trip.dateStartTrip).format('DD-MM-YYYY');
        const dateEnd = moment(trip.dateEndTrip).format('DD-MM-YYYY');

        return (

          <div className="tripContainer"  key={trip.id}>

            
            <div className="trip-route">
                
              {cityList.map((city, index) => (
                <span key={index} className="trip-city">
                  {city}
                  {index !== cityList.length - 1 && <span className="arrow">→</span>}
                </span>
              ))}
            </div>


            {!isAdmin && (
              <div className="user">
                
                <div className="userImageWrapper" onClick={() => toggleZoom(trip.id)}>
                  <img
                    src={trip.imgPath.replace('/upload/', '/upload/w_400,f_auto,q_auto/')}
                    alt={trip.userName}
                    className="userImage"
                    loading="lazy"
                  />
                </div>

                <p className="userName">{trip.userName}</p>

                {zoomedTripId === trip.id && (
                  <div className="zoomedOverlay" onClick={handleOutsideClick}>
                    <div
                      className="zoomedImage"
                      style={{ 
                        backgroundImage: `url(${trip.imgPath.replace('/upload/', '/upload/w_1200,f_auto,q_auto/')})`,
                       }}
                      onClick={(e) => e.stopPropagation()}
                    ></div>
                  </div>
                )}
              </div>
            )}

            <div className="trip-dates">
              <p>🗓️ <strong>Wyjazd:</strong> {dateStart}</p>
              <p>🗓️ <strong>Powrót:</strong> {dateEnd}</p>
            </div>



     
            <div className="trip-description-inline">

              <p
                className="toggle-description"
                onClick={() =>
                  setShowDescription(prev => ({
                    ...prev,
                    [trip.id]: !prev[trip.id],
                  }))
                }
              >
                { trip.description ? (
                <>
                {showDescription[trip.id] ? 
                <span>
                  <strong>📝 Opis wyjazdu </strong> <span className='btnShowHideTxt'>zwiń ▲</span>
                </span>  
                : 
                <span>
                  <strong>📝 Opis wyjazdu </strong> <span className='btnShowHideTxt'>rozwiń ▼</span>
                </span>
                }</>
              ):(<>
              <span>
                  <strong>📝 Opis wyjazdu </strong> <span className='btnShowHideTxt'>brak</span>
                </span>
              </>)}
              </p>
              
              <div className={`description ${showDescription[trip.id] ? 'show' : ''}`}>
                {trip.description}
              </div> 

            </div>
           

            <p
              className="toggle-contact"
              onClick={() =>
                setShowContact(prev => ({
                  ...prev,
                  [trip.id]: !prev[trip.id],
                }))
              }
            >   
              {showContact[trip.id] ? 
              <span>
                <strong>🔗 Kontakt </strong> <span className='btnShowHideTxt'> zwiń ▲</span> 
              </span> 
              : 
              <span>
                <strong>🔗 Kontakt </strong> <span className='btnShowHideTxt'> rozwiń ▼ </span>
              </span> 
              }
            </p>

            <div className={`trip-contact ${showContact[trip.id] ? 'show' : ''}`}>
              {trip.contactPhone && <p><span><FaWhatsapp color="#25D366" size={18} /> </span><strong>{trip.contactPhone}</strong></p>}
              {trip.contactInsta && <p><span><FaInstagram color="#E1306C" size={18} /></span><strong>@{trip.contactInsta.replace(/^@/, '')}</strong></p>}
              {trip.contactMessenger && 
              <p>
                  <span>
                    <FaFacebookMessenger color="#00B2FF" size={18} /> 
                  </span>
                  <strong>{trip.contactMessenger}</strong>
              </p>}
            </div>

            {isAdmin && <button onClick={() => handleDeleteTrip(trip.id)}>Usuń przejazd</button>}
          
          </div>
        );
      })}

      {!isAdmin && !loading && hasMore && trips.length > 0 && (
        <div className="load-more-wrapper" style={{ marginTop: '20px' }}>
          <button className="btn load-more-btn" onClick={loadMore}>
            Pokaż więcej
          </button>
        </div>
      )}
    </>
  );
}

export default TripsDisplay;
