const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  
  cityStart: { type: String, required: [true, "Pole 'Miejscowość startowa' nie może być puste !"] },
  cities: String,
  cityEnd: { type: String, required: [true, "Pole 'Miejscowość docelowa' nie może być puste !"] },
  citiesAll: { type: String, required: [true, "Pole 'Miejscowość docelowa' nie może być puste !"] },
  dateStartTrip :  { type: Date, required: [true, "Pole 'data wyjazdu' nie może być puste !"] },
  dateEndTrip :  { type: Date, required: [true, "Pole 'data powrotu' nie może być puste !"] },
  userName: { type: String, required: [true, "Pole 'Imie' nie może być puste !"] },
  imgPath: String,
  contentType: String,
  contactPhone: String,          // 🆕 Dodaj to
  contactInsta: String,          // 🆕 Dodaj to
  contactMessenger: String, 
  description: String,
  date: { type: Date, default: Date.now },
})

tripSchema.index({ date: -1 });

const trip = mongoose.model('Trip', tripSchema)

module.exports = trip