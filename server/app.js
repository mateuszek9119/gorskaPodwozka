require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');
require('./db');  // Połączenie z bazą danych MongoDB

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');  // Import connect-mongo
const bodyParser = require('body-parser');

const indexRouter = require('./routers/index');
const adminRouter = require('./routers/admin');

const PORT = process.env.PORT || 3001;

// Udostępnienie folderu uploads publicznie pod ścieżką /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed By CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,  // Umożliwia przekazywanie ciasteczek między serwerem a frontendem
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Konfiguracja sesji
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',  // Sekret sesji
    resave: false,  // Nie zapisuj sesji, jeśli nie zostały zmienione
    saveUninitialized: false,  // Nie twórz sesji, jeśli użytkownik jej nie używa
    cookie: {
      secure: process.env.NODE_ENV === 'production',  // Używaj secure cookie w produkcji
      maxAge: 1000 * 60 * 60 * 24 * 7,  // Czas życia ciasteczka (7 dni)
    },
    store: MongoStore.create({
      mongoUrl: process.env.DATA_BASE, // URL do MongoDB (zdefiniowane w zmiennych środowiskowych)
      collectionName: 'sessions', // Nazwa kolekcji, w której będą przechowywane sesje
      ttl: 14 * 24 * 60 * 60,  // Czas życia sesji w sekundach (14 dni)
    }),
  })
);

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// Serwuj statyczne pliki Reacta (build z clienta)

//app.use(express.static(path.join(__dirname, 'public')));
// Serwowanie plików statycznych (React)
app.use('/', express.static(path.join(__dirname, 'public')));

// Obsługuj API na ścieżce /api
app.get('/', (req, res) => {
  res.json({ message: "Backend działa!" });
});

// Obsługuj wszystkie inne ścieżki, żeby React mógł obsługiwać routing po stronie klienta
app.get('/*splat', (req, res) => { 
   res.sendFile(path.join(__dirname, 'public', 'index.html')); // To będzie obsługiwać routing Reacta
});


app.listen(PORT, () => {
  console.log('Server is ALIVE.');
});
