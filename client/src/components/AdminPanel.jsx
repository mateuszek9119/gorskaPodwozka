import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TripsDisplay from './TripsDisplay'


function AdminPanel({isAdmin}){

  const [trips, setTrips] = useState([])

  const fetchTrips = async ()=>{

    try{

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/all-trips`, { withCredentials: true })

      setTrips( response.data.data )
   
    }
    catch(err){
      console.error('Error featching Trips: ', err )
    }
  }


  useEffect(()=>{
    fetchTrips()
  }, [])


  const logOut = async ()=>{
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        window.location.reload(); // <--- odświeżenie aplikacji
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout', err);
    }
  }

  return(
    <>
        <p>Panel Admina</p>
        
        <button onClick={logOut}>Wyloguj</button>

        <TripsDisplay trips={trips} fetchTrips={fetchTrips} isAdmin={isAdmin} />
    </>
  )

}

export default AdminPanel