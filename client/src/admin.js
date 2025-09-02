import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

function Admin() {
  const [isAdmin, setIsAdmin] = useState(null); // null = nie wiemy jeszcze

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/adminPage`, { withCredentials: true })
      .then((res) => {
        if (res.data.valid && res.data.session) {
          setIsAdmin(res.data.session);
        } else {
          setIsAdmin(false);
        }
      })
      .catch(() => setIsAdmin(false));
  }, []);

  if (isAdmin === null) {
    return <p>Ładowanie...</p>;
  }

  return isAdmin ? <AdminPanel isAdmin={isAdmin} /> : <Login />;
}

export default Admin;