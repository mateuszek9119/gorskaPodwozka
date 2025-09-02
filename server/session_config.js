module.exports = {
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite:false,
    maxAge: 1000 * 60 * 60 * 24 
  }
};