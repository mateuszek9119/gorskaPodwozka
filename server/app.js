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

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(req.path).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return res.status(403).send('Niedozwolony typ pliku');
  }

  next();
}, express.static(path.join(__dirname, 'uploads')));


app.set('trust proxy', 1);


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

const isProduction = process.env.NODE_ENV === 'production';

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATA_BASE,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60, // 14 dni
    }),
    cookie: {
      secure: isProduction,                     // HTTPS tylko w produkcji (np. Heroku)
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',  // 'none' dla cross-site (Heroku), 'lax' lokalnie
      maxAge: 1000 * 60 * 60 * 24 * 7,          // 7 dni
    },
  })
);


app.use('/', indexRouter);
app.use('/admin-api', adminRouter);

// Serwowanie plików statycznych (React)

//app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Obsługuj API na ścieżce /api

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend działa!" });
});


// Obsługuj wszystkie inne ścieżki, żeby React mógł obsługiwać routing po stronie klienta

app.get(/^\/(?!admin-api|uploads|api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log('Server is ALIVE.');
});
