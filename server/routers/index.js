const express = require('express');
const path = require('path');
const Trip = require('./../TripSchema');

const router = express();

// 🆕 Cloudinary upload:
const { upload } = require('../config/cloudinary'); 

// GET /trips – bez zmian
router.get('/trips', async (req, res) => {
  try {
    const searchCity = req.query.name || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = searchCity
      ? { citiesAll: new RegExp(searchCity.trim(), "i") }
      : {};

    const trips = await Trip.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Trip.countDocuments(filter);

    const convertedTrips = trips.map(trip => ({
      id: trip._id,
      cityStart: trip.cityStart,
      cities: trip.cities,
      cityEnd: trip.cityEnd,
      citiesAll: trip.citiesAll,
      dateStartTrip: trip.dateStartTrip,
      dateEndTrip: trip.dateEndTrip,
      userName: trip.userName,
      imgPath: trip.imgPath, // 🔁 URL z Cloudinary
      contentType: trip.contentType,
      contactPhone: trip.contactPhone,
      contactInsta: trip.contactInsta,
      contactMessenger: trip.contactMessenger,
      description: trip.description
    }));

    res.json({
      data: convertedTrips,
      total,
      page,
      success: true
    });

  } catch (err) {
    console.log('Błąd w /trips:', err);
    res.status(500).send(err.message);
  }
});


// 🆕 POST /upload → teraz zapisuje do Cloudinary
router.post("/upload", upload.single('img'), async (req, res) => {
  if (
    !req.body.contactPhone &&
    !req.body.contactInsta &&
    !req.body.contactMessenger
  ) {
    return res.status(400).json({ success: false, message: 'Brakuje danych kontaktowych.' });
  }

  try {
    const newTrip = new Trip({
      cityStart: req.body.cityStart,
      cities: req.body.cities,
      cityEnd: req.body.cityEnd,
      citiesAll: `${req.body.cityStart} ${req.body.cities} ${req.body.cityEnd}`,
      dateStartTrip: req.body.dateStartTrip,
      dateEndTrip: req.body.dateEndTrip,
      userName: req.body.userName,
      imgPath: req.file.path, // 🔁 To jest link do zdjęcia w Cloudinary
      contentType: req.file.mimetype,
      contactPhone: req.body.contactPhone,
      contactInsta: req.body.contactInsta,
      contactMessenger: req.body.contactMessenger,
      description: req.body.description
    });

    await newTrip.save();
    res.status(201).send({ success: true, message: 'Trip uploaded successfully.' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Logowanie – bez zmian
router.post('/log', (req, res) => {
  if (req.query.login === process.env.ADMIN_USER && req.query.password === process.env.ADMIN_PASS) {
    req.session.admin = 'admin';
    res.json({ success: true, admin: req.session.admin });
  } else {
    res.json({ success: false, message: 'Nieprawidłowe dane logowania' });
  }
});

module.exports = router;
