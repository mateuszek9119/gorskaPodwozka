const express = require('express');
const Trip = require('./../TripSchema');
const mongoose = require('mongoose');

const router = express.Router();

// Middleware sprawdzający, czy użytkownik to admin
function requireAdmin(req, res, next) {
  if (req.session && req.session.admin === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Brak dostępu - nie jesteś administratorem.' });
}

// Sprawdzenie statusu sesji admina
router.get('/adminPage', requireAdmin, (req, res) => {
  res.json({ valid: true, session: req.session.admin });
});

// Pobranie wszystkich przejazdów z paginacją
router.get('/all-trips', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const trips = await Trip.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Trip.countDocuments({});

    const convertedTrips = trips.map(trip => ({
      id: trip._id,
      cityStart: trip.cityStart,
      cities: trip.cities,
      cityEnd: trip.cityEnd,
      citiesAll: trip.citiesAll,
      dateStartTrip: trip.dateStartTrip,
      dateEndTrip: trip.dateEndTrip,
      userName: trip.userName,
      contactPhone: trip.contactPhone,
      contactInsta: trip.contactInsta,
      contactMessenger: trip.contactMessenger,
      description: trip.description
    }));

    res.json({
      success: true,
      data: convertedTrips,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('Błąd pobierania wszystkich przejazdów dla admina:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera' });
  }
});

// Wylogowanie
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Błąd podczas niszczenia sesji:', err);
      return res.status(500).json({ success: false, message: 'Błąd wylogowania' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Wylogowano pomyślnie' });
  });
});

// Usunięcie przejazdu
router.delete('/delete/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Niepoprawne ID przejazdu' });
  }

  try {
    const result = await Trip.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Nie znaleziono przejazdu do usunięcia' });
    }

    res.json({ success: true, message: 'Usunięto przejazd' });
  } catch (error) {
    console.error('Błąd podczas usuwania przejazdu:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera podczas usuwania przejazdu' });
  }
});

module.exports = router;
