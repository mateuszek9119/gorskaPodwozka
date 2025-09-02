const express = require('express')
const multer = require('multer')
const path = require('path');
const Trip = require('./../TripSchema')

const router = express()


router.get('/trips', async (req, res) => {
  try {
    const searchCity = req.query.name || "";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Ustaw filtr wyszukiwania - case insensitive
    const filter = searchCity
      ? { citiesAll: new RegExp(searchCity.trim(), "i") }
      : {};

    // Pobierz dokumenty z filtrem i paginacją
    const trips = await Trip.find(filter).sort({ date: -1 }).skip(skip).limit(limit);

    // Policz ilość dokumentów z filtrem
    const total = await Trip.countDocuments(filter);

    // Zamiana dokumentów na obiekt JSON 
    const convertedTrips = trips.map(trip => {
      return {
        id: trip._id,
        cityStart: trip.cityStart,
        cities: trip.cities,
        cityEnd: trip.cityEnd,
        citiesAll: trip.citiesAll,
        dateStartTrip: trip.dateStartTrip,
        dateEndTrip: trip.dateEndTrip,
        userName: trip.userName,   
        imgPath: trip.imgPath,
        contentType: trip.contentType,
        contactPhone: trip.contactPhone,
        contactInsta: trip.contactInsta,
        contactMessenger: trip.contactMessenger,
        description: trip.description
      }
    })

    // Zwróć dane z paginacją i sukcesem
    res.json({
      data: convertedTrips,
      total,
      page,
      success: true
    })

  } catch (err) {
    console.log('Błąd w /trips:', err)
    res.status(500).send(err.message)
  }
})


// Ustawienie folderu na zapisywanie uploadów
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // folder uploads w katalogu wyżej niż routes
  },
  filename: function (req, file, cb) {
    // np. unikalna nazwa pliku: timestamp + oryginalna nazwa
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


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
      //imgPath: `/uploads/${req.file.filename}`, 
      imgPath: `${process.env.ALLOWED_ORIGINS}/uploads/${req.file.filename}`,
      contentType: req.file.mimetype,
      contactPhone: req.body.contactPhone,
      contactInsta: req.body.contactInsta,
      contactMessenger: req.body.contactMessenger,
      description: req.body.description
    })

    await newTrip.save()
    res.status(201).send({ success: true, message: 'Trip uploaded successfully.' })
  } catch (err) {
    res.status(500).send(err.message)
  }
})


router.post('/log', (req, res) => {
  if (req.query.login === process.env.ADMIN_USER && req.query.password === process.env.ADMIN_PASS) {
    req.session.admin = 'admin'
    res.json({ success: true, admin: req.session.admin })
  } else {
    res.json({ success: false, message: 'Nieprawidłowe dane logowania' })
  }
})

module.exports = router